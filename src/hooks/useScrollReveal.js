import { useEffect } from 'react';

/**
 * نمایش تدریجی و روان المان‌های .reveal-item.
 * - المان‌های بالای صفحه یا المان‌هایی که رد شده‌اند بلافاصله نمایش داده می‌شوند.
 * - در اسکرول سریع هیچ محتوایی مخفی نمی‌ماند.
 * - پس از یک بار نمایش، دوباره انیمیشن اجرا نمی‌شود.
 * - تنظیم prefers-reduced-motion را رعایت می‌کند.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal-item'));
    if (elements.length === 0) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 80px 0px',
      }
    );

    // بررسی اولیه المان‌های بالا یا درون دید
    const windowH = window.innerHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowH + 60) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    // محافظ اسکرول سریع: در صورتی که کاربر با سرعت بالا اسکرول کند
    let ticking = false;
    const handleFastScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentH = window.innerHeight;
        elements.forEach((el) => {
          if (!el.classList.contains('visible')) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= currentH + 80) {
              el.classList.add('visible');
              observer.unobserve(el);
            }
          }
        });
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleFastScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleFastScroll);
      observer.disconnect();
    };
  }, []);
}
