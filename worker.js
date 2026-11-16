export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.inertka.kz') {
      url.hostname = 'inertka.kz';
      return Response.redirect(url.toString(), 301);
    }
    // Адреса страниц без слеша на конце — 301 на версию со слешем.
    const last = url.pathname.split('/').pop();
    if (!url.pathname.endsWith('/') && !last.includes('.')) {
      url.pathname += '/';
      return Response.redirect(url.toString(), 301);
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    // Файлы с хэшем в имени не меняются — кэшируем на год; картинки — на неделю.
    if (url.pathname.startsWith('/_astro/')) out.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    else if (url.pathname.startsWith('/img/') || /\.(png|jpg|webp|svg|ico)$/.test(url.pathname)) out.headers.set('Cache-Control', 'public, max-age=604800');
    out.headers.set('X-Content-Type-Options', 'nosniff');
    out.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return out;
  },
};
