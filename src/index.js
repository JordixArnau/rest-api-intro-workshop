const app = require("./server");
const config = require("./config/config");
const connect = require("./db/connect");

connect().then(async () => {
  console.log(`DB connected at ${config.db.url}`);
});

app.listen(config.app.port, () => {
  console.log(`Server running at //localhost:${config.app.port}`);
});
