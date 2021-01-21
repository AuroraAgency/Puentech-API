const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    domain: process.env.DOMAIN || `http://localhost:${process.env.PORT || 3000}`,
  },
  db: {
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME
  }
};