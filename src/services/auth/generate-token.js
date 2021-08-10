const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/config");

function generateToken(data) {
  return jwt.sign(data, CONFIG.auth.token, { expiresIn: "180s" });
}

module.exports = {
  generateToken: generateToken,
};
