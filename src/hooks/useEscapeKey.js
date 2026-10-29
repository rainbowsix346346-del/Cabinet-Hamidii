import { useEffect } from 'react';

/** وقتی active=true، با زدن Escape تابع handler اجرا می‌شود. */
export function useEscapeKey(active, handler) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') handler(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, handler]);
}
