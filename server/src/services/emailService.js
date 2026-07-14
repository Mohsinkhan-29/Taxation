import { resend } from "../config/resend.js";
import { escapeHTML } from "../utils/escapeHTML.js";

// ---- Startup sanity checks (run once when this module loads) ----
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing from environment variables.");
}
if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is missing from environment variables.");
}
if (!process.env.ADMIN_EMAIL) {
  console.error("❌ ADMIN_EMAIL is missing from environment variables.");
}

// Notify YOU when someone submits the contact form
export const sendContactNotification = async (name, email, message) => {
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br/>");

  console.log("📤 [sendContactNotification] Attempting send:", {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
  });

  try {
    const { data, error } = await resend.emails.send({
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

    if (error) {
      console.error("❌ [sendContactNotification] Resend returned an error:", error);
      return { success: false, error };
    }

    console.log("✅ [sendContactNotification] Sent successfully. Resend ID:", data?.id);
    return { success: true, data };
  } catch (err) {
    // Network errors, thrown exceptions, invalid config, etc.
    console.error("🔥 [sendContactNotification] Threw an exception:", err);
    return { success: false, error: err };
  }
};

// Send welcome email TO the new subscriber
export const sendWelcomeEmail = async (subscriberEmail) => {
  const safeEmail = escapeHTML(subscriberEmail);

  console.log("📤 [sendWelcomeEmail] Attempting send:", {
    from: process.env.EMAIL_USER,
    to: subscriberEmail,
  });

  try {
    const { data, error } = await resend.emails.send({
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

    if (error) {
      console.error("❌ [sendWelcomeEmail] Resend returned an error:", error);
      return { success: false, error };
    }

    console.log("✅ [sendWelcomeEmail] Sent successfully. Resend ID:", data?.id);
    return { success: true, data };
  } catch (err) {
    console.error("🔥 [sendWelcomeEmail] Threw an exception:", err);
    return { success: false, error: err };
  }
};

// Notify YOU when someone subscribes
export const sendSubscriberNotification = async (subscriberEmail) => {
  const safeEmail = escapeHTML(subscriberEmail);

  console.log("📤 [sendSubscriberNotification] Attempting send:", {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    replyTo: subscriberEmail,
  });

  try {
    const { data, error } = await resend.emails.send({
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

    if (error) {
      console.error("❌ [sendSubscriberNotification] Resend returned an error:", error);
      return { success: false, error };
    }

    console.log("✅ [sendSubscriberNotification] Sent successfully. Resend ID:", data?.id);
    return { success: true, data };
  } catch (err) {
    console.error("🔥 [sendSubscriberNotification] Threw an exception:", err);
    return { success: false, error: err };
  }
};