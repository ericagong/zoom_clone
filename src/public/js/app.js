// Create WebSocket connection on FE
// In here, socket means connection to Server.
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (event) => {
  console.log("📥 New Message: ", event.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the Server ❌");
});

setTimeout(() => {
  socket.send("Hello, this is Browser✋");
}, 3000);
