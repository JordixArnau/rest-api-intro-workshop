const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const res = jwt.verify(token, config.auth.token);
    //Logic control
    if (!res) reject("JWT validation error");
    resolve(res);
  });
}

module.exports = {
  verifyToken: verifyToken,
};
