const Router = require("express").Router;

const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/:id", userController.fetchUserById);
userRouter.get("/", userController.fetchUsers);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = {
  userRouter: userRouter,
};
