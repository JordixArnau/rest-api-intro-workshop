const app = require("./server");
const config = require("./config/config");

app.listen(config.app.port, () => {
  console.log(`Server running at //localhost:${config.app.port}`);
});
