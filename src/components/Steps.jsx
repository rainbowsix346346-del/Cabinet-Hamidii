import { ORDER_STEPS, STEPS_SECTION } from '../data/steps.js';

/**
 * مراحل اجرای سفارش با چیدمان جمع‌وجور و خوانا.
 */
export default function Steps() {
  return (
    <section id="steps" className="steps-section">
      <div className="container">
        <div className="sec-head reveal-item">
          <div className="sec-label sec-label-light">{STEPS_SECTION.label}</div>
          <h2 className="sec-title sec-title-light">{STEPS_SECTION.title}</h2>
        </div>

        <div className="steps-grid">
          {ORDER_STEPS.map((st, index) => (
            <div
              key={st.num}
              className="step-card reveal-item"
              style={{ '--delay': index }}
            >
              <div className="step-circle-badge">{st.num}</div>
              <h3 className="step-name">{st.title}</h3>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
