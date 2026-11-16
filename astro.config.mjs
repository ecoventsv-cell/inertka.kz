import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://inertka.kz',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (p) => !p.includes('/404'),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  build: { inlineStylesheets: 'always' },
});
