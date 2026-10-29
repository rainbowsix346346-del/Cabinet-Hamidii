import { useState } from 'react';
import { FAQ_ITEMS, FAQ_SECTION } from '../data/faq.js';

/**
 * سوالات متداول (آکاردئون با دسترسی‌پذیری کامل و گوشه‌های نرم).
 */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="reveal-item">
      <div className="sec-label">{FAQ_SECTION.label}</div>
      <h3 className="block-title">{FAQ_SECTION.title}</h3>

      <div className="faq-wrap">
        {FAQ_ITEMS.map((item, idx) => {
          const open = openIndex === idx;
          return (
            <div key={item.q} className={`faq-item ${open ? 'expanded' : ''}`}>
              <h4 className="faq-heading">
                <button
                  type="button"
                  id={`faq-q-${idx}`}
                  className="faq-question"
                  aria-expanded={open}
                  aria-controls={`faq-a-${idx}`}
                  onClick={() => setOpenIndex(open ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className={`faq-indicator ${open ? 'open' : ''}`} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
              </h4>
              {open && (
                <div
                  id={`faq-a-${idx}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                  className="faq-answer stream-reveal"
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
