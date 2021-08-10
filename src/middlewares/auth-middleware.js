const { verifyToken } = require("../services/auth/verify-token");

async function authMiddleware(req, res, next) {
  const userClaims = await verifyToken(token);
}

module.exports = authMiddleware;
