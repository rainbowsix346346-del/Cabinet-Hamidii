import { SERVICES, SERVICES_SECTION } from '../data/services.js';

/**
 * لیست خدمات با نشانگرهای دایره‌ای زیبا و کارت‌های مدرن و جمع‌وجور.
 */
export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="sec-head reveal-item">
          <div className="sec-label">{SERVICES_SECTION.label}</div>
          <h2 className="sec-title">{SERVICES_SECTION.title}</h2>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, index) => (
            <div
              key={s.id}
              className="service-card reveal-item"
              style={{ '--delay': index }}
            >
              <div className="service-header">
                <span className="service-circle-badge" aria-hidden="true">
                  {s.num}
                </span>
                <h3 className="service-name">{s.title}</h3>
              </div>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
