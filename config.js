/* ==========================================================================
   ТонПлат · Конфигурация контактов, условий и интеграции заявок
   Все файлы проекта лежат строго в одной папке (./...) без подпапок.
   ========================================================================== */
window.TONPLAT_CONFIG = {
  brandName: "ТонПлат",
  legalShort: "ООО «Тон Плат»",
  legalFull: "Общество с ограниченной ответственностью «Тон Плат»",
  inn: "6314049248",
  kpp: "631401001",
  ogrn: "1226300038326",
  city: "Самара",
  address: "г. Самара, ул. Комсомольская, 29",
  addressLegal: "443061, г. Самара, ул. Ереванская, 13",
  addressFact: "443099, г. Самара, ул. Комсомольская, 29 (кухня и самовывоз)",
  siteUrl: "https://тонплат.рф/",
  siteUrlPunycode: "https://xn--80avfdgpf.xn--p1ai/",
  email: "tonplatsamara@gmail.com",
  director: "Вардалахос Ольга Геннадьевна",
  mapUrl: "https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0%2C%20%D1%83%D0%BB.%20%D0%9A%D0%BE%D0%BC%D1%81%D0%BE%D0%BC%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%2C%2029",
  phoneDisplay: "+7 (927) 605-84-88",
  phoneHref: "tel:+79276058488",
  whatsappNumber: "79276058488",
  telegramUrl: "https://t.me/+79276058488",
  vkUrl: "https://vk.com/ton_plat_samara",
  responsePromise: "Ответим после получения заявки",
  seasonNote: "Готовим с любовью · Самара и область",

  // В кабинете Zapnoty: Формы → Создать → разрешённые домены → маршрут получателя MAX.
  // Разрешённые origin формы: https://тонплат.рф (в punycode: см. siteUrlPunycode) и служебный домен GitHub Pages.
  // Вставьте сюда только публичный form_id в формате UUID (8-4-4-4-12 hex). НИКОГДА не вставляйте API-ключ zn_... .
  zapnoty: {
    formId: "", // ОБЯЗАТЕЛЬНО: UUID формы Zapnoty, например 123e4567-e89b-42d3-a456-426614174000
    endpointBase: "https://api.zapnoty.com/f/",
  },

  pricing: {
    buffetFrom: 400,
    coffeeBreakFrom: 550,
    banquetFrom: 1800,
    minOrder: 0
  },
};
