import express from "express";
import cors from "cors";
import messagesRouter from "./routes/messages.js";
import subscribersRouter from "./routes/subscribers.js";

const app = express();

// If deployed behind a reverse proxy / load balancer (Vercel, Render, Nginx, etc.),
// this is required for express-rate-limit to correctly identify client IPs.
app.set("trust proxy", 1);

// -------------------- MIDDLEWARE --------------------
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// -------------------- ROUTES --------------------
app.get("/", (req, res) => res.json({ status: "API running 🚀" }));
app.use("/api/messages", messagesRouter);
app.use("/api/subscribers", subscribersRouter);

export default app;
