const Router = require("express").Router;
const { firebaseMiddleware } = require("../middlewares/firebase-middleware");

const {
  getUsers,
  getSingleUser,
  signUp,
  logIn,
  deleteUser,
  refreshToken,
} = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.delete("/del/:userId", deleteUser);
UserRouter.get("/:userId", getSingleUser);
UserRouter.post("/sign-up", firebaseMiddleware, signUp);
UserRouter.post("/login", firebaseMiddleware, signUp);
UserRouter.post("/refresh", refreshToken);
UserRouter.get("/", firebaseMiddleware, getUsers);

module.exports = {
  UserRouter,
  Router,
};
