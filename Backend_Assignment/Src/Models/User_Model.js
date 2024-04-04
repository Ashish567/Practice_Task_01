const mongoose = require("mongoose");

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
  emailAddress: {
    type: String,
    required: false,
    unique: true,
  },
  // Define an array field for referencing the other model
  Contact_Model: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact_Model",
    },
  ],
});

// Create model
const User = mongoose.model("Contact", userModel);

module.exports = User;
