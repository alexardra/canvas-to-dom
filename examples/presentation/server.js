const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "../geometric_shapes/frames")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/canvas-to-dom.min.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build/canvas-to-dom.min.js"));
});

app.get("/app.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build/app.js"));
});

app.listen(3002, () => console.log("App listening on port 3002!"));