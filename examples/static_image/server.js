const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/app.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build/app.js"));
});

app.listen(3000, () => console.log("App listening on port 3000!"));
