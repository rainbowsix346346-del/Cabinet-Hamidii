/** لینک tel: را فقط برای شماره معتبر می‌سازد؛ در غیر این صورت null. */
export function buildTelHref(phoneTel) {
  const clean = String(phoneTel || '').replace(/[\s\-()]/g, '');
  return /^\+?\d{8,15}$/.test(clean) ? `tel:${clean}` : null;
}
