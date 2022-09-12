// Create WebSocket connection on FE
// In here, socket means connection to Server.
const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");

// {
// 	type: "message",
// 	payload: "hello, everyone",
// }

// {
// 	type: "nickname",
// 	payload: "erica",
// }

// FE should send data in String format.
// TODO string으로 보내야 백엔드가 어떤 언어를 처리하든지 언어 내에서 처리 가능하므로
const createMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(createMessage("message", input.value));
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(createMessage("nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleMessageSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (event) => {
  const li = document.createElement("li");
  li.innerText = event.data;
  messageList.appendChild(li);
  // console.log("📥 New Message: ", event.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from the Server ❌");
});

// setTimeout(() => {
//   socket.send("Hello, this is Browser✋");
// }, 3000);
