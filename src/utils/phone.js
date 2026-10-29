const PERSIAN = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC = '٠١٢٣٤٥٦٧٨٩';

/** ارقام فارسی/عربی را به لاتین تبدیل و فاصله/خط‌تیره را حذف می‌کند. +98 و 0098 را به 0 تبدیل می‌کند. */
export function normalizePhone(input) {
  if (!input) return '';
  let s = String(input);
  for (let i = 0; i < 10; i++) {
    s = s.split(PERSIAN[i]).join(String(i)).split(ARABIC[i]).join(String(i));
  }
  s = s.replace(/[\s\-_()]/g, '');
  if (s.startsWith('+98')) s = '0' + s.slice(3);
  else if (s.startsWith('0098')) s = '0' + s.slice(4);
  return s;
}

/** فقط موبایل ۱۱ رقمی که با 09 شروع شود. */
export function isValidMobile(normalized) {
  return /^09\d{9}$/.test(normalized);
}
