import SafeImage from './SafeImage.jsx';
import { HERO_IMAGE } from '../data/inspiration.js';
import { HERO_CONTENT } from '../data/hero.js';
import { useTypewriter } from '../hooks/useTypewriter.js';

/**
 * بخش اصلی بالای صفحه با انیمیشن تایپ زنده بدون پرش چیدمان.
 */
export default function Hero() {
  const { displayedText, remainingText, isComplete } = useTypewriter(HERO_CONTENT.title, 22);

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content reveal-item">
          <div className="hero-eyebrow stream-reveal">
            <span className="eyebrow-dot" aria-hidden="true" />
            {HERO_CONTENT.eyebrow}
          </div>

          <h1 className="hero-title" aria-label={HERO_CONTENT.title}>
            <span className="typewriter-visible">{displayedText}</span>
            <span className="typewriter-ghost" aria-hidden="true">{remainingText}</span>
            <span className={`typewriter-cursor ${isComplete ? 'done' : ''}`} aria-hidden="true">|</span>
          </h1>

          <p className="hero-desc stream-reveal">
            {HERO_CONTENT.desc}
          </p>

          <div className="hero-actions stream-reveal">
            <a href="#estimate" className="btn btn-solid">
              {HERO_CONTENT.ctaEstimate}
            </a>
            <a href="#services" className="btn btn-outline">
              {HERO_CONTENT.ctaServices}
            </a>
          </div>
        </div>

        <div className="hero-img-wrap reveal-item">
          <SafeImage
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={900}
            height={600}
            eager
            className="hero-img"
          />
          <span className="img-inspiration-tag">{HERO_CONTENT.inspirationBadge}</span>
        </div>
      </div>
    </section>
  );
}
