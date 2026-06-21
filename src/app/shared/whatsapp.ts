export const WHATSAPP_NUMBER = 'REPLACE_WITH_NUMBER'; // E.g. '15551234567' (no + or spaces)

export function buildWhatsAppUrl(message = ''): string {
  const number = WHATSAPP_NUMBER;
  const encoded = encodeURIComponent(message || 'Hello, I would like a quote.');
  return `https://wa.me/${number}?text=${encoded}`;
}

export function openWhatsAppLink(message = ''): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, '_blank');
}
