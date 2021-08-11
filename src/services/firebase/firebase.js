const admin = require("firebase-admin");
const CONFIG = require("../../config/config");

admin.initializeApp({
  credential: admin.credential.cert(CONFIG.firebase.certConfig),
});

const auth = admin.auth();

module.exports = {
  admin: admin,
  auth: auth,
};
