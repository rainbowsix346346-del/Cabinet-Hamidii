import { useEffect } from 'react';

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/** فوکوس را داخل containerRef نگه می‌دارد و هنگام بسته شدن به المان قبلی برمی‌گرداند. */
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active || !containerRef.current) return undefined;
    const container = containerRef.current;
    const previous = document.activeElement;
    const items = () => Array.from(container.querySelectorAll(FOCUSABLE));
    (items()[0] || container).focus();

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = items();
      if (list.length === 0) { e.preventDefault(); return; }
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    container.addEventListener('keydown', onKey);
    return () => {
      container.removeEventListener('keydown', onKey);
      if (previous && previous.focus) previous.focus();
    };
  }, [active, containerRef]);
}
