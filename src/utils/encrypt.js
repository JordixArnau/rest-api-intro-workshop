const bcrypt = require("bcrypt");
const CONFIG = require("../config/config");

async function hashing(pass) {
  const hashedPass = await bcrypt.hash(pass, Number(CONFIG.encrypt.salt));
  return hashedPass;
}

async function checkPass(logPass, hashedPass) {
  const isValid = await bcrypt.compare(logPass, hashedPass);
  return isValid;
}

module.exports = {
  hash: hashing,
  checkPass: checkPass,
};
