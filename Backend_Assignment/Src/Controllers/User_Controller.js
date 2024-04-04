const catch_async = require("../Utils/CatchAsync");
const Joi = require("joi");

exports.get_user = catch_async(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Get user by id",
  });
});

// exports.
