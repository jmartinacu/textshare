
function openWebsocket() {
  console.log("WebSocket connection opened");
}

function closeWebsocket() {
  console.log("WebSocket connection closed");
}

function messageWebsocket(event: MessageEvent) {
  console.log("WebSocket message received:", event.data);
}

function errorWebsocket(error: Event) {
  console.error("WebSocket error observed:", error);
}

export default function socketController(socket: WebSocket, _req: Request) {
  socket.addEventListener("open", openWebsocket);
  socket.addEventListener("close", closeWebsocket);
  socket.addEventListener("message", messageWebsocket);
  socket.addEventListener("error", errorWebsocket);
}

export {
  openWebsocket,
  closeWebsocket,
  messageWebsocket,
  errorWebsocket,
}