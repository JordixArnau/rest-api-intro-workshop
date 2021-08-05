const movieController = require("./movie-controller");
const userController = require("./user-controller");
const authController = require("./auth-controller");

module.exports = {
  authController: authController,
  userController: userController,
  movieController: movieController,
};
