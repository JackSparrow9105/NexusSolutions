# Nexus AI Assistant – backend (100% free)

Runs on Cloudflare Workers + Cloudflare Workers AI. Free plan: no API key, no credit card.
The free allowance is 10,000 "neurons" per day (resets daily at 00:00 UTC / 5:30 AM IST),
enough for a few hundred short chats a day. If it runs out, the chat politely asks visitors
to call or WhatsApp instead – nothing breaks and you are never charged.

## One-time setup (about 10 minutes)

1. Create a free account at https://dash.cloudflare.com/sign-up (just email, no card).
2. Install Node.js if you don't have it, then in this `ai-worker` folder run:
   ```bash
   npm install -g wrangler
   wrangler login
   ```
3. Edit `wrangler.toml` → `ALLOWED_ORIGINS`: add your live site address, e.g.
   `"https://www.mynexussolutions.in,https://mynexussolutions.in,http://localhost:4200"`
4. Deploy:
   ```bash
   wrangler deploy
   ```
   It prints a URL like `https://nexus-ai.<account>.workers.dev`.
5. Open `src/app/shared/ai-config.ts` and set
   `AI_ENDPOINT = 'https://nexus-ai.<account>.workers.dev/chat'`
6. `npm start` → the "Ask AI" bubble appears above the WhatsApp button. Rebuild and deploy the site.

## Notes
- Only origins in `ALLOWED_ORIGINS` are accepted, and each IP is limited to 20 questions / 10 minutes.
- The assistant only recommends products from `src/app/shared/product-data.ts` and never quotes prices.
- The free model is smaller than paid ones: answers are fine for product guidance but keep an eye on them.
  If you ever want better answers, you can swap MODEL in wrangler.toml for another Workers AI model.
