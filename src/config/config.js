const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV = "development",
  MONGODB_URL_TEST,
  MONGODB_URL_DEVELOPMENT,
  MONGODB_URL_PRODUCTION,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
  ACCESS_TOKEN_SECRET,
  PORT = 4000,
} = process.env;

const CONFIG = {
  test: {},
  development: {
    app: {
      port: PORT,
    },
    db: {
      url: MONGODB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
    auth: {
      token: ACCESS_TOKEN_SECRET,
    },
  },
  production: {
    app: {
      port: PORT,
    },
    db: {
      url: MONGODB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
    auth: {
      token: ACCESS_TOKEN_SECRET,
    },
  },
};

module.exports = CONFIG[NODE_ENV];
