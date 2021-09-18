require('dotenv').config()

let config = {
  auth: {},
  db: {}
}

config.port = process.env.PORT || '3000'

config.auth.secret = process.env.AUTH_SECRET || '';

config.db.uri = process.env.DB_URI || '';

module.exports = config;