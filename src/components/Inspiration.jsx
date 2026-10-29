import SafeImage from './SafeImage.jsx';
import { INSPIRATION_ITEMS, INSPIRATION_SECTION } from '../data/inspiration.js';

function Card({ item, featured = false, index = 0 }) {
  return (
    <figure
      className={`gallery-card reveal-item ${featured ? 'featured' : ''}`}
      style={{ '--delay': index }}
    >
      <SafeImage
        src={item.img}
        alt={item.title}
        width={featured ? 800 : 600}
        height={featured ? 500 : 380}
        className="gallery-card-img"
      />
      <figcaption className="gallery-card-info">
        <div className="gallery-card-title">{item.title}</div>
        <div className="gallery-card-desc">{item.desc}</div>
      </figcaption>
    </figure>
  );
}

/**
 * گالری ایده‌های طراحی با ابعاد جمع‌وجور، مدرن و گوشه‌های گرد.
 */
export default function Inspiration() {
  const [featured, ...rest] = INSPIRATION_ITEMS;

  return (
    <section id="inspiration" className="gallery-section">
      <div className="container">
        <div className="sec-head reveal-item">
          <div className="sec-label">{INSPIRATION_SECTION.label}</div>
          <h2 className="sec-title">{INSPIRATION_SECTION.title}</h2>
        </div>

        <div className="gallery-disclaimer reveal-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{INSPIRATION_SECTION.disclaimer}</span>
        </div>

        <div className="gallery-editorial-grid">
          <Card item={featured} featured index={0} />
          {rest.map((item, idx) => (
            <Card key={item.id} item={item} index={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
