import { Resend } from "resend";

// -------------------- RESEND CLIENT --------------------
// Sends over HTTPS instead of raw SMTP — avoids the SMTP port
// blocking/timeouts common on Render, Railway, Heroku, etc.
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is not set — email sending will fail");
}
if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is not set — email sending will fail");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
