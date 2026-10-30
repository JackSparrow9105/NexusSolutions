// Single place for the business WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = '918905302210';

export function buildWhatsAppUrl(message = ''): string {
  const encoded = encodeURIComponent(message || 'Hello, I would like a quote.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsAppLink(message = ''): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener');
}
