const db = require("../models/user-model");
const { hash, checkPass } = require("../utils/encrypt");
const { generateToken } = require("../services/auth/generate-token");
const randToken = require("rand-token");
const { sessionData } = require("../session/session");

async function refreshToken(req, res, next) {
  const { nickName, refreshToken } = req.body;

  try {
    if (
      refreshToken in sessionData.refreshTokens &&
      sessionData.refreshTokens[refreshToken] === nickName
    ) {
      console.log("Fins aquí");
      const accessToken = generateToken({ nickName: nickName });

      return res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: `Welcome ${nickName}`,
      });
    }
  } catch (err) {
    return res.status(401).send({
      error: err,
    });
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await db.User.find().lean();

    res.status(200).send(users);
  } catch (err) {
    "Can't connect: " + err;
  }
}

async function getSingleUser(req, res, next) {
  try {
    const { userId } = req.params;
    const users = await db.User.find({ _id: userId }).lean();

    res.status(200).send(users);
  } catch (err) {
    "Can't connect: " + err;
  }
}

async function signUp(req, res, next) {
  const { nickName, firstName, lastName, email, password } = req.body;
  const encrypted = await hash(password);

  try {
    const { _id } = await db.User.create({
      nickName: nickName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encrypted,
    });

    res.status(201).send({
      id: _id,
    });
  } catch (err) {
    "Error: " + err;
  }
}

async function logIn(req, res, next) {
  const { nickName, password } = req.body;

  try {
    if (nickName) {
      const user = await db.User.findOne({
        nickName: nickName,
      });

      const isValid = await checkPass(password, user.password);

      if (isValid) {
        const accessToken = generateToken({ nickName: nickName });
        const refreshToken = randToken.generate(256);

        sessionData.refreshTokens[refreshToken] = nickName;

        res.status(200).send({
          isSuccessful: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          data: "You're in!",
        });
      } else {
        res.status(403).send({
          data: "Forbidden!",
        });
      }
    }
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    const result = await db.User.deleteOne({
      _id: userId,
    }).lean();

    if (result.ok === 1 && result.deletedCount === 1) {
      res.status(200).send({
        data: "User removed",
      });
    } else {
      res.status(500).send({
        data: "Can't remove the user!",
      });
    }
  } catch (err) {
    "Error: " + err;
  }
}

module.exports = {
  getUsers: getUsers,
  signUp: signUp,
  deleteUser: deleteUser,
  getSingleUser: getSingleUser,
  logIn: logIn,
  refreshToken: refreshToken,
};
