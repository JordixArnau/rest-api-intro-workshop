const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");

const { UserRouter } = require("./routes/user-routes");

const app = express();

app.use(helmet());
app.use(json());

app.use("/users", UserRouter);

app.get("/", (req, res) => {
  res.status(200).send("Henlo default potato");
});

module.exports = app;
