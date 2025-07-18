const translations: { [key: string]: string } = {
  "hello": "ہیلو",
  "world": "دنیا",
  "name": "نام",
  "friend": "دوست",
  "love": "محبت",
  "food": "کھانا",
  "water": "پانی",
  "book": "کتاب",
  "school": "سکول",
  "teacher": "استاد",
  "student": "طالب علم",
  "father": "والد",
  "mother": "والدہ",
  "brother": "بھائی",
  "sister": "بہن",
  "day": "دن",
  "night": "رات",
  "sun": "سورج",
  "moon": "چاند",
  "star": "ستارہ",
  "sky": "آسمان",
  "earth": "زمین",
  "air": "ہوا",
  "fire": "آگ",
  "light": "روشنی",
  "dark": "اندھیرا",
  "man": "آدمی",
  "woman": "عورت",
  "child": "بچہ",
  "baby": "نوزائیدہ",
  "home": "گھر",
  "house": "مکان",
  "car": "گاڑی",
  "road": "سڑک",
  "city": "شہر",
  "village": "گاؤں",
  "country": "ملک",
  "language": "زبان",
  "word": "لفظ",
  "sentence": "جملہ",
  "question": "سوال",
  "answer": "جواب",
  "yes": "ہاں",
  "no": "نہیں",
  "please": "براہ کرم",
  "thank you": "شکریہ",
  "sorry": "معاف کیجیے",
  "good": "اچھا",
  "bad": "برا",
  "happy": "خوش",
  "sad": "اداس",
  "fast": "تیز",
  "slow": "آہستہ",
  "hot": "گرم",
  "cold": "ٹھنڈا",
  "big": "بڑا",
  "small": "چھوٹا",
  "tall": "لمبا",
  "short": "چھوٹا",
  "old": "پرانا",
  "new": "نیا",
  "clean": "صاف",
  "dirty": "گندا",
  "strong": "مضبوط",
  "weak": "کمزور",
  "rich": "امیر",
  "poor": "غریب",
  "easy": "آسان",
  "hard": "مشکل",
  "beautiful": "خوبصورت",
  "ugly": "بدصورت",
  "open": "کھولنا",
  "close": "بند کرنا",
  "come": "آنا",
  "go": "جانا",
  "run": "دوڑنا",
  "walk": "چلنا",
  "sit": "بیٹھنا",
  "stand": "کھڑا ہونا",
  "sleep": "سونا",
  "wake": "جاگنا",
  "eat": "کھانا",
  "drink": "پینا",
  "see": "دیکھنا",
  "hear": "سننا",
  "speak": "بولنا",
  "read": "پڑھنا",
  "write": "لکھنا",
  "play": "کھیلنا",
  "work": "کام کرنا",
  "study": "مطالعہ کرنا",
  "buy": "خریدنا",
  "sell": "بیچنا",
  "help": "مدد کرنا",
  "wait": "انتظار کرنا",
  "drive": "چلانا",
  "think": "سوچنا",
  "understand": "سمجھنا",
  "remember": "یاد رکھنا",
  "forget": "بھولنا", 
  "router": "راؤٹر",
  "server": "سرور",
  "components": "اجزاء",
  "ui": "یوزر انٹرفیس",
  "theming": "تھیم بندی",
  "styling": "سجاوٹ",
  "accessibility": "رسائی",
  "testing": "جانچ",
  "review": "جائزہ",
  "demo": "ڈیمو",
  "quote": "اقتباس",
  "generator": "جنریٹر",
  "intro": "تعارف",
  "webhooks": "ویب ہکس",
  "agents": "ایجنٹس",
  "integration": "انضمام",
  "crud": "کریئیٹ، ریڈ، اپڈیٹ، ڈیلیٹ",
  "ci/cd": "مسلسل انضمام / مسلسل تعیناتی",
  "actions": "اعمال",
  "due": "آخری تاریخ",
  "sprint": "تیز کام",
  "wireframes": "وائر فریمز",
  "backend": "بیک اینڈ",
  "db": "ڈیٹا بیس",
  "milestone": "اہم مرحلہ",
  "pushed": "دھکیلا گیا / اپ لوڈ کیا گیا",
  "frontend": "فرنٹ اینڈ",
  "logic": "منطق",
  "polish": "چمکانا / بہتر بنانا",
  "responsiveness": "جوابی صلاحیت",
  "bug-fixing": "خرابی دور کرنا",
  "tweaks": "تبدیلیاں",
  "public": "عوامی",
  "live": "براہ راست",
  "qa": "کوالٹی اشورنس",
  "optimization": "بہتری",
  "docs": "دستاویزات",
  "walkthrough": "وضاحت",
  "final": "حتمی",
  "building": "تعمیر کرنا",
  "intelligent": "ذہین",
  "solutions": "حل",
  "transformation": "تبدیلی",
  "technology": "ٹیکنالوجی",
  "internet": "انٹرنیٹ",
};



export function translateText(text: string): string {
  return text
    .split(' ')
    .map(word => translations[word] || word)
    .join(' ');
}
