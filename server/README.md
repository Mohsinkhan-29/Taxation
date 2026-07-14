# Biz2Optima Backend

Contact form + newsletter subscriber API. Same logic as before, just split into files.

## Structure

```
server.js                       # entry point — loads env, connects DB, starts listening
src/
  app.js                        # express app, middleware, route mounting
  config/
    db.js                       # pg Pool + connectDB()
    resend.js                   # Resend client
  middleware/
    rateLimiters.js              # messageLimiter, subscriberLimiter
  schemas/
    validators.js                # zod schemas (messageSchema, subscriberSchema)
  services/
    emailService.js              # all Resend email-sending functions
  routes/
    messages.js                  # POST/GET /api/messages
    subscribers.js                # POST/GET /api/subscribers
  utils/
    escapeHTML.js                 # HTML-escaping helper
```

## Setup

```bash
npm install
cp .env.example .env   # fill in real values
npm start               # or: npm run dev
```
