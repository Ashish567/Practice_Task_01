const expressWinston = require("express-winston");
const winston = require("winston");
/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require("winston-mongodb");

const requestLog = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.json({
        space: 2,
      }),
    }),
    new winston.transports.MongoDB({
      db: "localhost:27001", //Your Db connection
      options: {
        useNewUrlParser: true,
        poolSize: 2,
        autoReconnect: true,
      },
    }),
  ],
  meta: true,
  msg: "Request: HTTP {{req.method}} {{req.url}}; Username: {{req.user.preferred_username}}; ipAddress {{req.connection.remoteAddress}}",
  requestWhitelist: [
    "url",
    "method",
    "httpVersion",
    "originalUrl",
    "query",
    "body",
  ],
});

exports.requestLog = requestLog;
