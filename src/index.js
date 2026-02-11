export default {
  async fetch(request) {
    const url = new URL(request.url);
    let targetUrl = url.searchParams.get('url');
    
    if (!targetUrl) {
      return new Response("请提供目标网址", { status: 400 });
    }

    const newHeaders = new Headers(request.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body
      });
      const res = new Response(response.body, response);
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    } catch (e) {
      return new Response("代理失败: " + e.message, { status: 500 });
    }
  }
};