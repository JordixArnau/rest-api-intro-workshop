const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");

const { accountRouter, userRouter } = require("./routes");
const { errorMiddleware } = require("./middlewares");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());

app.use("/account", accountRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use(errorMiddleware);

module.exports = app;
