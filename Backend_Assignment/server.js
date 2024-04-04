const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProcessError = require("./Src/Utils/Process_Error");

process.on("uncaughtException", (err) => {
  new ProcessError("UNCAUGHT EXCEPTION! 💥 Shutting down...", err);
  process.exit(1);
});

const app = require("./Src/app");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: `./Config/${envFile}` });
process.env = {
  ...process.env,
  ...dotenv.config({ path: `./Config/config.env` }).parsed,
};

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .set("strictQuery", false)
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => new ProcessError("DB connection failed!", err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process
  .on("unhandledRejection", (err) => {
    new ProcessError("UNHANDLED REJECTION! 💥 Shutting down...", err);
    server.close(() => process.exit(1));
  })
  .on("SIGTERM", () => {
    new ProcessError("👋 SIGTERM RECEIVED. Shutting down gracefully", err);
    server.close(() => console.log("💥 Process terminated!"));
  });
