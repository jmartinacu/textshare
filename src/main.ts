import httpController from "./http.ts";
import socketController from "./websocket.ts";


Deno.serve(async (req: Request) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return await httpController(req);
  } else {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socketController(socket, req);
    return response;
  }
});
