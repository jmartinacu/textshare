interface HTTPHandler {
  [url: string]: (req: Request) => Response | Promise<Response>;
}

const TemplatesDir = new URL("../templates", import.meta.url).pathname;

const HTTP: HTTPHandler = {};

HTTP["/"] = async (_req) => {
  const home = await Deno.open(`${TemplatesDir}/home.html`, {
    read: true,
  });
  return new Response(home.readable, {
    headers: {
      "Content-Type": "text/html",
      "Accept-Ranges": "bytes",
      "Content-Length": (await Deno.stat(`${TemplatesDir}/home.html`)).size
        .toString(),
    },
  });
};

HTTP["/([a-zA-Z0-9]{5})"] = (_req) => {
  return new Response("Hello World", {
    headers: {
      "Content-Type": "text/plain",
      "Accept-Ranges": "bytes",
    },
  });
}


export default function httpController(req: Request) {
  const url = new URL(req.url);
  const handler = HTTP[url.pathname] ||
    Object.entries(HTTP).find(([key]) => new RegExp(key).test(url.pathname))
      ?.[1];
  if (!handler) {
    return new Response("Not Found", { status: 404 });
  }
  return handler(req);
}
