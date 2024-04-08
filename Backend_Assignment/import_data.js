const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Connect to MongoDB using Mongoose
dotenv.config({ path: `./Config/.env.${process.env.NODE_ENV}` });

console.log(process.env.NODE_ENV);
const DB = process.env.DATABASE_CLOUD.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
).replace("<username>", process.env.DATABASE_USER_NAME);

mongoose
  .set("strictQuery", false)
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => new ProcessError("DB connection failed!", err));

// Define Mongoose model
const Contact = require("./Src/Models/Contact_Model");
const User = require("./Src/Models/User_Model");

// Function to import data from CSV file
async function importDataFromCSV(filename, filename2) {
  try {
    await importCSV(filename, Contact);
    await importCSV(filename2, User);
    console.log("Data import completed");
    // Contact.createIndex({ name: "text" });
    // console.log("Index creation completed for name.");
  } catch (err) {
    console.error("Error importing data:", err);
  }
}

function importCSV(filename, Model) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filename)
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", () => {
        Model.insertMany(results)
          .then(() => {
            console.log(`Data imported from ${filename}`);
            resolve();
          })
          .catch((err) => {
            console.error(`Error importing data from ${filename}:`, err);
            reject(err);
          });
      });
  });
}

module.exports = {
  importDataFromCSV,
};
