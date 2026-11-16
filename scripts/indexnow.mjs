// Отправляет все адреса из sitemap в IndexNow (Яндекс, Bing и др.) — чтобы не ждать обхода.
// Запуск после выкладки: npm run indexnow
import { readFileSync, readdirSync } from 'node:fs';
const key = '24a4a45d6ba270f552e1a2bb4588cf20';
const host = 'inertka.kz';
const files = readdirSync('dist').filter((f) => /^sitemap-\d+\.xml$/.test(f));
const urls = files.flatMap((f) => [...readFileSync('dist/' + f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
const res = await fetch('https://yandex.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log('IndexNow:', res.status, 'адресов:', urls.length);
