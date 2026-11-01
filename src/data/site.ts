// Единый источник фактов о компании. Цены и условия — только от владельца.

export const site = {
  name: 'Инертка',
  domain: 'inertka.kz',
  url: 'https://inertka.kz',
  city: 'Астана',
  phone: '+7 700 554 00 01',
  phoneHref: 'tel:+77005540001',
  manager: 'Умида',
  whatsapp: '77005540001',
  address: 'Астана, ул. Бейбитшилик, 18/1, БЦ «Сервер», офис 14',
  addressShort: 'ул. Бейбитшилик, 18/1, офис 14',
  freeDeliveryFrom: 100, // тонн
};

export function waLink(text = 'Здравствуйте! Хочу заказать инертные материалы.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type Product = {
  slug: string; // путь страницы без слешей по краям
  key: string; // ключ для привязки статей
  name: string; // короткое имя
  h1: string;
  price: number | null; // ₸ за тонну с НДС
  unit: string;
  short: string;
};

export const products: Product[] = [
  {
    slug: 'dresva',
    key: 'dresva',
    name: 'Дресва',
    h1: 'Дресва в Астане с доставкой',
    price: 6000,
    unit: 'т',
    short: 'Для обратной засыпки, подсыпки площадок, дорог и оснований.',
  },
  {
    slug: 'shheben/20-40',
    key: 'shheben-20-40',
    name: 'Щебень 20-40',
    h1: 'Щебень 20-40 в Астане с доставкой',
    price: 7500,
    unit: 'т',
    short: 'Для бетона фундаментов, дренажа, оснований под дороги и площадки.',
  },
  {
    slug: 'shheben/0-50',
    key: 'shheben-0-50',
    name: 'Щебень 0-50',
    h1: 'Щебень 0-50 (щебёночная смесь) в Астане',
    price: 7000,
    unit: 'т',
    short: 'Плотное основание под дороги, парковки, промплощадки и отсыпку.',
  },
];

export const terms = [
  'Цены за тонну, с НДС',
  `От ${site.freeDeliveryFrom} тонн — доставка по всей Астане включена`,
  `До ${site.freeDeliveryFrom} тонн — доставка платная, сумму называет менеджер`,
  'Поставка в любом объёме',
  'Сертификаты на материал',
  'Официальная поставка, оплата перечислением',
  'Скидка на большие объёмы — обсуждается индивидуально',
];

export const fmt = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ');

// Бетон: цена за м³ с НДС (прайс поставщика + 1 500 ₸ наценки, решение владельца 01.11.2026).
export const beton = [
  { cls: 'В7,5', mark: 'М100', price: 29500 },
  { cls: 'В10', mark: 'М150', price: 30500 },
  { cls: 'В15', mark: 'М200', price: 31500 },
  { cls: 'В20', mark: 'М250', price: 32500 },
  { cls: 'В22,5', mark: 'М300', price: 34000 },
  { cls: 'В25', mark: 'М350', price: 35000 },
  { cls: 'В30', mark: 'М400', price: 37500 },
  { cls: 'В35', mark: 'М450', price: 39500 },
];
export const peskobeton = [
  { cls: 'В7,5', mark: 'М100', price: 28500 },
  { cls: 'В10', mark: 'М150', price: 30000 },
  { cls: 'В15', mark: 'М200', price: 30500 },
  { cls: 'В20', mark: 'М250', price: 32500 },
  { cls: 'В22,5', mark: 'М300', price: 33500 },
];
export const sulfatePlus = 500; // сульфатостойкий: +500 ₸/м³
export const betonDelivery = { tripUpTo8: 40000, perM3From8: 5000 }; // по городу, с НДС
