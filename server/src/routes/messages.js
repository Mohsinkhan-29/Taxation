import express from "express";
import { pool } from "../config/db.js";
import { messageSchema } from "../schemas/validators.js";
import { messageLimiter } from "../middleware/rateLimiters.js";
import { sendContactNotification } from "../services/emailService.js";

const router = express.Router();

router.post("/", messageLimiter, async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
