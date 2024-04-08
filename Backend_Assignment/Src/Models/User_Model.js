const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Contact_Model = require("./Contact_Model");

// Define schema
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
  },
  created: { type: Date, default: Date.now },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  // Define an array field for referencing the other model
  Contact_Model: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact_Model",
    },
  ],
});

// Pre-save hook to hash the password before saving
userModel.pre("save", async function (next) {
  // Hash the password only if it is modified or is new
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with the new salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Override the plaintext password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
userModel.post("save", async function (doc, next) {
  Contact_Model.create({
    name: doc.name,
    phoneNumber: doc.phoneNumber,
    spam: false,
    spamCount: 0,
    registeredUser: true,
  });
  next();
});
userModel.post("save", async function (doc, next) {
  console.log("Importing Contacts into global DB....");
  next();
});

// Create model
const User = mongoose.model("User", userModel);

module.exports = User;
