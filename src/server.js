import express from "express";

const app = express();

// set view engine
app.set("view engine", "pug");
// set views
app.set("views", __dirname + "src/views");

// use static file
app.use("/public", express.static(__dirname + "/public"));

// render a view
app.get("/", (request, result) => result.render("home"));
// only use one url
app.get("/*", (request, response) => response.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
