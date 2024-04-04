const catch_async = require("../Utils/CatchAsync");
const Joi = require("joi");

exports.get_all_numbers = catch_async(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Get all numbers",
  });
});
exports.Create_Contact = catch_async(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Create Contact",
  });
});
