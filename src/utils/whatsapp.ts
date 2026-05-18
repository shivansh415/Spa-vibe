import { siteConfig } from '@/config/site';

export interface BookingDetails {
  name: string;
  phone: string;
  service: string;
  date?: string;
  time?: string;
  message?: string;
}

/**
 * Open WhatsApp with pre-filled booking message
 */
export function openWhatsAppBooking(details: BookingDetails) {
  const { name, phone, service, date, time, message } = details;

  const lines = [
    `🌿 *New Appointment — ${siteConfig.brandName}*`,
    ``,
    `👤 Name: ${name}`,
    `📱 Phone: ${phone}`,
    `💆 Service: ${service}`,
  ];

  if (date) {
    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
    lines.push(`📅 Date: ${formattedDate}`);
  }

  if (time) lines.push(`⏰ Time: ${time}`);
  if (message) lines.push(`📝 Note: ${message}`);
  lines.push(``, `_Booked via website_`);

  const text = lines.join('\n');
  const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
}

/**
 * Open WhatsApp with a general enquiry
 */
export function openWhatsAppEnquiry(message?: string) {
  const defaultMsg = `Hi! I'd like to know more about ${siteConfig.brandName}'s services.`;
  const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message || defaultMsg)}`;
  window.open(url, '_blank', 'noopener');
}
