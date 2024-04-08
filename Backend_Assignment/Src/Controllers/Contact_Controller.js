const catch_async = require("../Utils/Catch_Async");
const Contact_Model = require("../Models/Contact_Model");
const AppError = require("../Utils/App_Error");

exports.search_via_numbers = catch_async(async (req, res, next) => {
  const number = req.params.number;
  if (!number || number.trim() === "") {
    res.status(422).json({
      status: "error",
      message: "number is required",
    });
  }
  try {
    const result = await Contact_Model.find({ phoneNumber: number });
    result.map((contact) => {
      if (contact.registeredUser === true) {
        res.status(200).json({
          status: "success",
          message: "Number found",
          data: contact,
        });
      }
    });
    res.status(200).json({
      status: "success",
      message: "Number found",
      data: result,
    });
  } catch (err) {
    return next(
      new AppError("There was an error creating the user. Try again later!"),
      500
    );
  }
});

exports.search_via_name = catch_async(async (req, res, next) => {
  const name = req.params.name;
  if (!name || name.trim() === "") {
    res.status(422).json({
      status: "error",
      message: "Name is required",
    });
  }
  try {
    const result = await Contact_Model.aggregate([
      {
        $match: {
          name: {
            $regex: `.*${name}.*`,
            $options: "i",
          },
        },
      },
      {
        $addFields: {
          startsWithQuery: {
            $eq: [
              {
                $indexOfCP: ["$name", name],
              },
              0,
            ],
          },
        },
      },
      {
        $sort: {
          startsWithQuery: -1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      message: "Got matching numbers",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("Something went wrong. Try again later!"), 500);
  }
});

exports.Create_Spam_Contact = catch_async(async (req, res, next) => {
  const result = Contact_Model.validate({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    spam: req.body.spam,
  });
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  try {
    const contact = Contact_Model.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (contact) {
      Contact_Model.findByIdAndUpdate(contact._id, {
        spam: req.body.spam,
        spamCount: contact.spamCount + 1,
      });
    } else {
      await Contact_Model.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        spam: req.body.spam,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Create Contacted successfully!",
    });
  } catch (err) {
    return next(new AppError("Something went wrong. Try again later!"), 500);
  }
});
