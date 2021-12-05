/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/*", (_req, res, _next) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(process.env.PORT || 8000);
