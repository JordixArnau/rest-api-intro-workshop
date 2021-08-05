const { userRouter } = require("./user-routes");
const { movieRouter } = require("./movie-routes");
const { accountRouter } = require("./account-routes");

module.exports = {
  accountRouter,
  userRouter,
  movieRouter,
};
