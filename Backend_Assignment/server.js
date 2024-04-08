const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ProcessError = require("./Src/Utils/Process_Error");

// const importDataFromCSV = require("./import_data");
// importDataFromCSV.importDataFromCSV("./Data/Contact.csv", "./Data/User.csv");

process.on("uncaughtException", (err) => {
  new ProcessError("UNCAUGHT EXCEPTION! 💥 Shutting down...", err);
  process.exit(1);
});

const app = require("./Src/app");

dotenv.config({ path: `./Config/.env.${process.env.NODE_ENV}` });

console.log(process.env.NODE_ENV);
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
