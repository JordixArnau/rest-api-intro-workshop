const db = require("../models");
const { compareEncrypted } = require("../utils/encrypt");

async function authenticate(req, res, next) {
  const { email, password: inputPassword } = req.body;

  try {
    const userResponse = await db.User.findOne({
      email: email,
    });

    if (!userResponse) {
      return res.status(400).send({
        error: "Error, invalid credentials!",
      });
    }

    if (userResponse) {
      const { password } = userResponse;

      const isUser = await compareEncrypted({
        plainData: inputPassword,
        encryptedData: password,
      });

      if (isUser) {
        return res.status(200).send({
          data: {
            id: userResponse._id,
          },
        });
      } else {
        return res.status(401).send(
          generateResponse({
            error: "Login error, user and/or password not correct!",
          }),
        );
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate: authenticate,
};
