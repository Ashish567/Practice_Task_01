const mongoose = require("mongoose");

const logModel = new mongoose.Schema({
  method: String,
  url: String,
  status: Number,
  responseTime: Number,
  date: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logModel);

module.exports = Log;
