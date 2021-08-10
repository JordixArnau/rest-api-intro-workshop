const Router = require("express").Router;

const {
  getUsers,
  getSingleUser,
  signUp,
  logIn,
  deleteUser,
} = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.delete("/del/:userId", deleteUser);
UserRouter.get("/:userId", getSingleUser);
UserRouter.post("/signup", signUp);
UserRouter.get("/login", logIn);
UserRouter.get("/", getUsers);

module.exports = {
  UserRouter,
  Router,
};
