import { site, type Product } from './site';

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: strip(i.a) },
    })),
  };
}

export function productSchema(p: Product, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.name} в Астане`,
    description,
    image: `${site.url}${p.img}`,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'KZT',
      availability: 'https://schema.org/InStock',
      url: `${site.url}/${p.slug}/`,
      seller: { '@id': `${site.url}/#org` },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.price,
        priceCurrency: 'KZT',
        unitCode: 'TNE',
        valueAddedTaxIncluded: true,
      },
    },
  };
}

export function crumbsSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}
