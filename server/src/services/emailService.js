import { resend } from "../config/resend.js";
import { escapeHTML } from "../utils/escapeHTML.js";

// Notify YOU when someone submits the contact form
export const sendContactNotification = (name, email, message) => {
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
export const sendWelcomeEmail = (subscriberEmail) => {
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
export const sendSubscriberNotification = (subscriberEmail) => {
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
