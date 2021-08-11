const db = require("../models/user-model");
const { generateToken } = require("../services/auth/generate-token");
const randToken = require("rand-token");
const { sessionData } = require("../session/session");

async function refreshToken(req, res, next) {
  const { email, refreshToken } = req.body;

  try {
    if (
      refreshToken in sessionData.refreshTokens &&
      sessionData.refreshTokens[refreshToken] === email
    ) {
      console.log("Fins aquí");
      const accessToken = generateToken({ email: email });

      return res.status(200).send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: `Welcome ${email}`,
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
  const { uid, email } = req.user;

  try {
    const user = await db.User.findOne({ email: email });

    if (user) {
      return res.sendStatus(200);
    }

    const newUser = await db.User.create({
      _id: uid,
      email: email,
    });

    res.status(201);
  } catch (err) {
    next(err);
  }
}

async function logIn(req, res, next) {
  const { email, password } = req.body;

  try {
    if (email) {
      const user = await db.User.findOne({
        email: email,
      });

      const isValid = await checkPass(password, user.password);

      if (isValid) {
        const accessToken = generateToken({ email: email });
        const refreshToken = randToken.generate(256);

        sessionData.refreshTokens[refreshToken] = email;

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
