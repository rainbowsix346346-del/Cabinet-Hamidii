import { useEffect, useState } from 'react';

/**
 * تایپ تدریجی متن بدون پرش ساختار یا تاخیر.
 * در صورت فعال بودن prefers-reduced-motion بلافاصله متن کامل نمایش داده می‌شود.
 * @param {string} fullText متن اصلی
 * @param {number} speed سرعت تایپ بر حسب میلی‌ثانیه برای هر حرف
 */
export function useTypewriter(fullText = '', speed = 24) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!fullText) return undefined;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) {
      setIndex(fullText.length);
      return undefined;
    }

    // شروع سریع
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setIndex(current);
      if (current >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed]);

  const displayedText = fullText.slice(0, index);
  const remainingText = fullText.slice(index);
  const isComplete = index >= fullText.length;

  return { displayedText, remainingText, isComplete };
}
