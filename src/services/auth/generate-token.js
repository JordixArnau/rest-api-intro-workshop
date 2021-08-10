const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function generateToken() {
  jwt.sign(data, config.auth.token, { expiresIn: "180s" });
}

module.exports = {
  generateToken: generateToken,
};
