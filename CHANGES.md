# Changes – Nexus Solutions website

Copy these files over your project (same folder structure). No new npm packages needed.

## Buttons & links (fixed)
- Navbar links to /contact, /projects, /mission, /leadership, /certifications crashed the router (pages don't exist).
  Now: Company → About Us, Mission & Vision, Why Choose Us; Contact & Testimonials scroll to the home sections.
  Leadership, Certifications and Projects were removed until those pages exist.
- Footer "About Us", "Get a Quote" fixed; "Our Products" links now open the product on /products.
- Unknown URLs redirect to home instead of a blank page (app.routes.ts).
- "Request Quotation" is now a real button (keyboard accessible) and focuses the form.
- Product modal "Enquire for Installation" (home + products page) now pre-fills the form with the product and its category.
- Desktop Products dropdown (25 items) was taller than the screen → now scrolls, plus a "View all products" link.
- Mobile menu: closes after picking a link, when tapping outside, or Esc; Company/Products open on tap; no more 65px gap guess.
- Fragment links (#contact, product links) no longer land hidden under the fixed navbar.
- Esc closes product popups; page scroll is restored properly; timers cleaned up when leaving the page.

## Mobile / responsive (fixed)
- Phones (360px): contact section was wider than the screen → page scrolled sideways. Fixed.
- Products page heading was partly under the navbar. Fixed.
- Smaller headings/paddings on phones, toast no longer covers the WhatsApp button.

## Contact form (improved)
- Errors shown under each field (not just a toast), first wrong field gets focus.
- Mobile: +91 prefix, numeric keypad, accepts "+91 98765 43210" and cleans it to 10 digits, must start with 6–9.
- Email format check, message character counter, WhatsApp/email icons added.
- "Send via Email" no longer leaves an empty browser tab.
- Floating WhatsApp button now uses 8905302210 (was 9161495113), same as the rest of the site.
- Contact text said "team in Lucknow" – changed to Chennai (matches the address). Phone/email are now tap-to-call / tap-to-mail.

## Branding / SEO
- Page title, description, keywords still said "ProGround Energy – solar panels/inverters/UPS" (template leftover). Now Nexus Solutions.
- Modal badge "Pro Ground Certified" → "Nexus Solutions". og:image pointed to a missing file.

## NEW: AI Product Assistant
- src/app/shared/ai-assistant/*, src/app/shared/ai-config.ts, app.component.* – "Ask AI" chat bubble.
- ai-worker/ – small Cloudflare Worker using FREE Cloudflare Workers AI (no API key, no card). Setup steps: ai-worker/README.md.
- Hidden until you set AI_ENDPOINT in ai-config.ts, so nothing changes on the live site until you're ready.
