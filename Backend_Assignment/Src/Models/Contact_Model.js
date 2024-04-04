const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Contact_Model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  spam: {
    type: Boolean,
    default: false,
  },
});

Contact_Model.plugin(aggregatePaginate);
module.exports = mongoose.model("Contact", Contact_Model);
