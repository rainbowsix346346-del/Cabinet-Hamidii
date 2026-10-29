import { BUSINESS_CONFIG } from '../config/business.js';
import { buildTelHref } from '../utils/tel.js';

/**
 * نوار تماس ثابت (.sticky-contact-bar):
 * - کانتینر مستطیلی با گوشه‌های گرد (border-radius: 12px) در پایین صفحه
 * - تقسیم به دو بخش مساوی ۵۰٪
 * - آیکون و دکمه واتساپ در سمت راست
 * - آیکون و دکمه تماس در سمت چپ
 */
export default function FloatingActions() {
  const telHref = buildTelHref(BUSINESS_CONFIG.phoneTel) || `tel:${BUSINESS_CONFIG.phoneTel}`;
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappMessage)}`;

  return (
    <aside className="sticky-contact-bar" aria-label="ارتباط سریع">
      {/* سمت راست: واتساپ (در حالت RTL اولین ستون در سمت راست قرار می‌گیرد) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bar-item contact-bar-whatsapp"
        aria-label={BUSINESS_CONFIG.whatsappButtonLabel}
        title={BUSINESS_CONFIG.whatsappButtonLabel}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>{BUSINESS_CONFIG.whatsappButtonLabel}</span>
      </a>

      {/* سمت چپ: تماس تلفنی (در حالت RTL دومین ستون در سمت چپ قرار می‌گیرد) */}
      <a
        href={telHref}
        className="contact-bar-item contact-bar-call"
        aria-label={BUSINESS_CONFIG.callButtonLabel}
        title={BUSINESS_CONFIG.callButtonLabel}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>{BUSINESS_CONFIG.callButtonLabel}</span>
      </a>
    </aside>
  );
}
