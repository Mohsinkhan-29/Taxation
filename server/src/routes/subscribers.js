import express from "express";
import { pool } from "../config/db.js";
import { subscriberSchema } from "../schemas/validators.js";
import { subscriberLimiter } from "../middleware/rateLimiters.js";
import { sendWelcomeEmail, sendSubscriberNotification } from "../services/emailService.js";

const router = express.Router();

router.post("/", subscriberLimiter, async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subscribers ORDER BY subscribed_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
