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
  CLIENT_URL,
  FB_TYPE,
  FB_PROJECT_ID,
  FB_PRIVATE_KEY_ID,
  FB_PRIVATE_KEY,
  FB_CLIENT_EMAIL,
  FB_CLIENT_ID,
  FB_AUTH_URI,
  FB_TOKEN_URI,
  FB_AUTH_PROVIDER_X509_URL,
  FB_CLIENT_X509_URL,
} = process.env;

const CONFIG = {
  test: {},
  development: {
    app: {
      port: PORT,
    },
    client: {
      URL: CLIENT_URL || "http://localhost:3000",
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
    firebase: {
      certConfig: {
        type: FB_TYPE,
        project_id: FB_PROJECT_ID,
        private_key_id: FB_PRIVATE_KEY_ID,
        private_key: FB_PRIVATE_KEY,
        client_email: FB_CLIENT_EMAIL,
        client_id: FB_CLIENT_ID,
        auth_uri: FB_AUTH_URI,
        token_uri: FB_TOKEN_URI,
        auth_provider_x509_url: FB_AUTH_PROVIDER_X509_URL,
        client_x509_url: FB_CLIENT_X509_URL,
      },
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
