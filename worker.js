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
    return env.ASSETS.fetch(request);
  },
};
