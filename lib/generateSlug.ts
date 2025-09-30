export function generateSlug(title: string): string {
  return title
    .toString()
    .toLowerCase()
    // إزالة التشكيل العربي (اختياري)
    .normalize("NFD").replace(/[\u064B-\u0652]/g, "")
    // استبدال أي مسافة أو شرطة بالشرطة "-"
    .replace(/\s+/g, "-")
    // إزالة علامات الترقيم الشائعة
    .replace(/[؟?!،؛.,:]/g, "")
    // إزالة الرموز الغريبة مثل @#$%^&*(){}[]<>/\
    .replace(/[^a-z0-9\u0600-\u06FF-ء-ي-]/g, "")
    // حذف أي شرطات متكررة
    .replace(/-+/g, "-")
    // حذف الشرطة من البداية أو النهاية
    .replace(/^-|-$/g, "");
}
