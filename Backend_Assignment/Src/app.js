const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose_morgan = require("mongoose-morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const mongoose = require("mongoose");
const AppError = require("./Utils/App_Error");
const globalErrorHandler = require("./Controllers/Error_Controller");

// const logger = require("./Middleware/Request_Log");

const user_routes = require("./Routes/User_Routes");
const contact_routes = require("./Routes/Contact_Routes");

// Start express app
const app = express();
app.use(express.json());

app.enable("trust proxy");

app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *

app.options("*", cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// process.env.DATABASE_CLOUD
// app.use(
//   mongoose_morgan(
//     {
//       collection: "error_logger",
//       connectionString: mongoose.connection.client.s.url + "/logs-db",
//       // user: "admin",
//       // pass: "test12345",
//     },
//     {
//       skip: function (req, res) {
//         return res.statusCode < 400;
//       },
//     },
//     "dev"
//   )
// );
// app.use(logger);
// Production logging
if (process.env.NODE_ENV === "production") {
  // console.log("Production");
}
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
  validate: { trustProxy: false },
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(bodyParser.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

app.use(compression());
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Contact API",
  });
});

// 3) ROUTES
app.use("/api/v1/user", user_routes);
app.use("/api/v1/contact", contact_routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
