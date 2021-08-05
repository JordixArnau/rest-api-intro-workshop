const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV = "development",
  MONGODB_URL_TEST,
  MONGODB_URL_DEVELOPMENT,
  MONGODB_URL_PRODUCTION,
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
  },
  production: {
    app: {
      port: PORT,
    },
    db: {
      url: MONGODB_URL_PRODUCTION,
    },
  },
};

module.exports = CONFIG[NODE_ENV];
