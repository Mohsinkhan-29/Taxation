import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import pkg from "pg";
import { Resend } from "resend";
import { z } from "zod";


dotenv.config();

const { Pool } = pkg;
const app = express();

// If deployed behind a reverse proxy / load balancer (Vercel, Render, Nginx, etc.),
// this is required for express-rate-limit to correctly identify client IPs.
app.set("trust proxy", 1);

// -------------------- MIDDLEWARE --------------------
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// -------------------- POSTGRES POOL --------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Without this handler, an error on an idle pooled client (dropped connection,
// DB restart, network blip, etc.) is treated as an uncaught exception and
// crashes the whole process. This just logs it and lets the pool recover.
pool.on("error", (err) => {
  console.error("❌ Unexpected PG pool error (idle client):", err);
});

try {
  await pool.query("SELECT NOW()");
  console.log("✅ PostgreSQL Connected");
} catch (err) {
  console.error("❌ DB Error:", err);
}

// -------------------- RESEND CLIENT --------------------
// Sends over HTTPS instead of raw SMTP — avoids the SMTP port
// blocking/timeouts common on Render, Railway, Heroku, etc.
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is not set — email sending will fail");
}
if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is not set — email sending will fail");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// -------------------- VALIDATION SCHEMAS --------------------

const messageSchema = z.object({
  name: z
    .string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),

  email: z
    .string()
    .email("Invalid email format")
    .max(100)
    .transform((val) => val.toLowerCase().trim()),

  message: z
    .string()
    .min(5, "Message too short")
    .max(1000, "Message too long")
});


const subscriberSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .max(100)
    .transform((val) => val.toLowerCase().trim())
});

// -------------------- SECURITY HELPERS --------------------

const escapeHTML = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");


// -------------------- EMAIL HELPERS --------------------

// Notify YOU when someone submits the contact form
const sendContactNotification = (name, email, message) => {
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br/>");

  return resend.emails.send({
    from: `Biz2Optima Contact <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `📩 New Message from ${safeName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a2f5e;">New Contact Form Submission</h2>
        <hr style="border-color: #d4e6d4;" />
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; color: #333;">
          ${safeMessage}
        </div>
        <hr style="border-color: #d4e6d4;" />
        <p style="color: #888; font-size: 12px;">Sent via Biz2Optima contact form</p>
      </div>
    `
  });
};

// Send welcome email TO the new subscriber
const sendWelcomeEmail = (subscriberEmail) => {
  const safeEmail = escapeHTML(subscriberEmail);

  return resend.emails.send({
    from: `Biz2Optima Solutions <${process.env.EMAIL_USER}>`,
    to: subscriberEmail,
    subject: "Welcome to Biz2Optima! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a2f5e;">Welcome to Biz2Optima Solutions!</h2>
        <hr style="border-color: #d4e6d4;" />
        <p>Hi there,</p>
        <p>Thank you for subscribing! 🎊 You're now part of the <strong>Biz2Optima</strong> community.</p>
        <p>Here's what to expect:</p>
        <ul style="color: #333; line-height: 1.8;">
          <li>✅ Latest tax & business updates</li>
          <li>✅ Tips for Australian, UK & Pakistani markets</li>
          <li>✅ Exclusive offers and insights</li>
        </ul>
        <p>Feel free to <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #1a2f5e;">reach out to us</a> anytime.</p>
        <hr style="border-color: #d4e6d4;" />
        <p style="color: #888; font-size: 12px;">© Biz2Optima Solutions. You subscribed at biz2optima.com (${safeEmail})</p>
      </div>
    `
  });
};

// Notify YOU when someone subscribes
const sendSubscriberNotification = (subscriberEmail) => {
  const safeEmail = escapeHTML(subscriberEmail);

  return resend.emails.send({
    from: `Biz2Optima <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: subscriberEmail,
    subject: `🔔 New Subscriber: ${safeEmail}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a2f5e;">New Newsletter Subscriber</h2>
        <hr style="border-color: #d4e6d4;" />
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <hr style="border-color: #d4e6d4;" />
        <p style="color: #888; font-size: 12px;">Sent via Biz2Optima subscriber system</p>
      </div>
    `
  });
};

// -------------------- RATE LIMITERS --------------------
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many messages, try later." }
});

const subscriberLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests, try later." }
});

// -------------------- ROUTES --------------------
app.get("/", (req, res) => res.json({ status: "API running 🚀" }));

// -------------------- MESSAGES --------------------
app.post("/api/messages", messageLimiter, async (req, res) => {
  try {
    const parsed = messageSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.errors[0]?.message || "Invalid input"
      });
    }

    const { name, email, message } = parsed.data;

    // Save to DB
    const result = await pool.query(
      `INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, message]
    );

    // Send email notification to you (non-blocking — won't fail the request if email fails)
    sendContactNotification(name, email, message)
      .catch(err => console.error("❌ Contact email failed:", err));

    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------- SUBSCRIBERS --------------------
app.post("/api/subscribers", subscriberLimiter, async (req, res) => {
  try {
    const parsed = subscriberSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: parsed.error.errors[0]?.message || "Invalid input"
      });
    }

    const { email } = parsed.data;

    // Check duplicate (email already normalized to lowercase by schema)
    const check = await pool.query(
      "SELECT * FROM subscribers WHERE email = $1", [email]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // Save to DB
    const result = await pool.query(
      `INSERT INTO subscribers (email) VALUES ($1) RETURNING *`,
      [email]
    );

    // Send welcome email to subscriber + notify you (both non-blocking)
    sendWelcomeEmail(email)
      .catch(err => console.error("❌ Welcome email failed:", err));

    sendSubscriberNotification(email)
      .catch(err => console.error("❌ Subscriber notify email failed:", err));

    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/subscribers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));