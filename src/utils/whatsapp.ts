import { siteConfig } from '@/config/site';

export interface BookingDetails {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export const openWhatsAppBooking = (details: BookingDetails) => {
  const { name, phone, service, date, time, message } = details;

  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  const text = [
    `🌿 *New Appointment — The Ark Spa & Salon*`,
    ``,
    `👤 Name: ${name}`,
    `📱 Phone: ${phone}`,
    `💆 Service: ${service}`,
    `📅 Date: ${formattedDate}`,
    `⏰ Time: ${time}`,
    message ? `📝 Note: ${message}` : null,
    ``,
    `_Booked via website_`,
  ]
    .filter(Boolean)
    .join('\n');

  const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
};
