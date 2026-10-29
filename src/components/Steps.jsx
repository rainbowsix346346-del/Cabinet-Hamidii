import { ORDER_STEPS, STEPS_SECTION } from '../data/steps.js';

/**
 * مراحل اجرای سفارش با طراحی بهینه، خلوت، جمع‌وجور و مدرن.
 */
export default function Steps() {
  return (
    <section id="steps" className="steps-section">
      <div className="container">
        <div className="sec-head reveal-item">
          <div className="sec-label sec-label-light">{STEPS_SECTION.label}</div>
          <h2 className="sec-title sec-title-light">{STEPS_SECTION.title}</h2>
        </div>

        <div className="steps-flow">
          {ORDER_STEPS.map((st, index) => (
            <div
              key={st.num}
              className="step-flow-card reveal-item"
              style={{ '--delay': index }}
            >
              <div className="step-card-header">
                <span className="step-num-badge" aria-hidden="true">
                  {st.num}
                </span>
                <h3 className="step-name">{st.title}</h3>
              </div>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
