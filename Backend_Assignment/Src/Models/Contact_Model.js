const { boolean } = require("joi");
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Contact_Model = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  spam: {
    type: Boolean,
    default: false,
  },
  spamCount: {
    type: Number,
    default: 0,
  },
  registeredUser: {
    type: Boolean,
    default: false,
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

Contact_Model.plugin(aggregatePaginate);
module.exports = mongoose.model("Contact", Contact_Model);
