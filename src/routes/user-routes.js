const Router = require("express").Router;
const { authMiddleware } = require("../middlewares/auth-middleware");

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
UserRouter.post("/signup", signUp);
UserRouter.post("/login", logIn);
UserRouter.post("/refresh", refreshToken);
UserRouter.get("/", authMiddleware, getUsers);

module.exports = {
  UserRouter,
  Router,
};
