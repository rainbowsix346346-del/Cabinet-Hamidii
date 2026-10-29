import { BUSINESS_CONFIG } from '../config/business.js';
import { FOOTER_TEXT } from '../data/footer.js';

/** فوتر سایت با چیدمان جمع‌وجور و هماهنگ. */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand-info">
          <strong>{BUSINESS_CONFIG.brandName}</strong> — {FOOTER_TEXT.description}
        </div>
        <div className="footer-contact-info">
          <span>{BUSINESS_CONFIG.city}</span> | <span>{BUSINESS_CONFIG.phoneDisplay}</span>
        </div>
      </div>
    </footer>
  );
}
