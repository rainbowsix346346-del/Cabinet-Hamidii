/** کاراکترهای کنترلی را حذف، فاصله‌های اضافه را جمع و متن را trim می‌کند. */
export function sanitizeText(value, maxLength = 200) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}
