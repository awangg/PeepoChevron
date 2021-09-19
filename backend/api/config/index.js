require('dotenv').config()

let config = {
  port: "",
  auth: {
    secret: ""
  },
  db: {
    uri: ""
  },
  twilio: {
    sid: "",
    auth: ""
  }
}

config.port = process.env.PORT || '3000'

config.auth.secret = process.env.AUTH_SECRET || '';

config.db.uri = process.env.DB_URI || '';

config.twilio.sid = process.env.TWILIO_SID;
config.twilio.auth = process.env.TWILIO_AUTH;

module.exports = config;