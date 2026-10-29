import { useEffect } from 'react';

/** وقتی active=true، اسکرول صفحه قفل می‌شود. */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}
