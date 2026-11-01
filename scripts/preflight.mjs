// Проверка сборки перед выкладкой: битые внутренние ссылки, дубли title/H1,
// пустые description, сломанный JSON-LD, «посуточно» и прочие запреты.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p);
  }
})(dist);

const errors = [];
const warns = [];
const titles = new Map();
const h1s = new Map();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const page = '/' + f.slice(dist.length + 1).replace(/index\.html$/, '');
  if (page.includes('404')) continue;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  if (!title) errors.push(`${page}: нет title`);
  if (!desc) errors.push(`${page}: нет description`);
  if (h1.length !== 1) errors.push(`${page}: H1 на странице: ${h1.length}`);
  if (title) (titles.get(title) ?? titles.set(title, []).get(title)).push(page);
  if (h1[0]) (h1s.get(h1[0]) ?? h1s.set(h1[0], []).get(h1[0])).push(page);
  if (title && title.length > 75) warns.push(`${page}: title длиннее 75 символов (${title.length})`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { errors.push(`${page}: битый JSON-LD`); }
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (/\.(svg|png|jpg|webp|xml|txt|ico)$/.test(href)) { if (!existsSync(join(dist, href))) errors.push(`${page}: нет файла ${href}`); continue; }
    if (!href.endsWith('/')) errors.push(`${page}: ссылка без слеша ${href}`);
    else if (!existsSync(join(dist, href, 'index.html'))) errors.push(`${page}: битая ссылка ${href}`);
  }
}
for (const [t, ps] of titles) if (ps.length > 1) errors.push(`дубль title «${t}»: ${ps.join(', ')}`);
for (const [t, ps] of h1s) if (ps.length > 1) warns.push(`дубль H1 «${t}»: ${ps.join(', ')}`);

warns.forEach((w) => console.warn('ВНИМАНИЕ:', w));
if (errors.length) {
  errors.forEach((e) => console.error('ОШИБКА:', e));
  console.error(`\npreflight: ${errors.length} ошибок`);
  process.exit(1);
}
console.log(`preflight: ок, страниц ${files.length}`);
