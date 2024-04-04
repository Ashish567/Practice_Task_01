const express = require("express");
const authController = require("../Controllers/Auth_Controller"); // Import the authController module
const Contact_Controller = require("../Controllers/Contact_Controller");

const router = express.Router();

router.use(authController.protect);

router.post("/", Contact_Controller.Create_Contact);
router.get("/:number", Contact_Controller.get_all_numbers);

module.exports = router;
