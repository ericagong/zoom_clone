import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

// set view engine
app.set("view engine", "pug");
// set views
app.set("views", __dirname + "/views");

// use static file
app.use("/public", express.static(__dirname + "/public"));

// render a view
app.get("/", (request, result) => result.render("home"));
// only use one url
app.get("/*", (request, response) => response.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// 1. create express http server with http.createServer().
const server = http.createServer(app);

// 2. create websocket server on top of http server.
const wss = new WebSocket.Server({ server });

// fake Database for saving all connected sockets.
const sockets = [];

wss.on("connection", (socket) => {
  // In here, socket means connection to FE.
  console.log("Connected to Browser ✅");
  // add socket when connected
  sockets.push(socket);
  socket.send("Hello, this is Server✋");

  socket.on("message", (message) => {
    // console.log(
    //   "📥 New Message: ",
    //   message.toString("utf-8"),
    //   " from the browser"
    // );
    // send messages to all connected browsers.
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf-8")));
  });

  socket.on("close", () => {
    console.log("Disconnected from the Browser ❌");
  });
});

// 3. run http, ws server on the same port.
server.listen(3000, handleListen);
