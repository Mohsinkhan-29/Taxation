import rateLimit from "express-rate-limit";

export const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: "Too many messages, try later." }
});

export const subscriberLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests, try later." }
});
