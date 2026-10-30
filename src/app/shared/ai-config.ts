/**
 * AI Product Assistant settings.
 *
 * The site is static (GitHub Pages), so the AI runs in a small free Cloudflare Worker, not in Angular code.
 * Deploy the small worker in /ai-worker (see ai-worker/README.md), then paste its URL below.
 * While AI_ENDPOINT is empty the chat bubble stays hidden, so the site works exactly as before.
 */
export const AI_ENDPOINT = 'https://nexus-ai.nexussolutions.workers.dev/chat'

export const AI_WELCOME =
  "Hi! I'm the Nexus Solutions assistant. Tell me about your site (building, solar plant, tower, soil type…) " +
  'and I will suggest the right earthing, lightning protection or BOS products.';

export const AI_SUGGESTIONS = [
  'Which earthing is best for a 100 kW solar plant?',
  'Chemical earthing vs GI pipe earthing?',
  'Do I need an ESE lightning arrester for a warehouse?'
];
