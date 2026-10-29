import { FORM_ENDPOINT, FORM_TIMEOUT_MS } from '../config/business.js';

/**
 * ===== نقطه اتصال به بک‌اند =====
 * FORM_ENDPOINT را در config/business.js پر کنید تا POST واقعی ارسال شود.
 * تا آن موقع فقط ارسال را شبیه‌سازی می‌کند.
 * @param {object} payload داده‌های پاک‌سازی‌شده فرم
 * @param {AbortSignal} [externalSignal] برای لغو هنگام unmount
 */
export async function submitForm(payload, externalSignal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORM_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  externalSignal?.addEventListener('abort', onAbort);

  try {
    if (!FORM_ENDPOINT) {
      await new Promise((resolve, reject) => {
        const t = setTimeout(resolve, 600);
        controller.signal.addEventListener('abort', () => {
          clearTimeout(t);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });
      return { ok: true, simulated: true };
    }
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true, simulated: false };
  } finally {
    clearTimeout(timer);
    externalSignal?.removeEventListener('abort', onAbort);
  }
}
