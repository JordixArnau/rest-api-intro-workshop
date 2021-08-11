const { auth } = require("../services/firebase/firebase");

async function firebaseMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const cleanedToken = req.headers.authorization.substr(7);

    try {
      const userClaims = await auth.verifyIdToken(cleanedToken);

      const { email, uid } = userClaims;

      req.user = {
        email: email,
        uid: uid,
      };

      next();
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(401).send({
      data: null,
      error: "Unathorized",
    });
  }
}

module.exports = {
  firebaseMiddleware: firebaseMiddleware,
};
