const express = require("express");
const authController = require("../Controllers/Auth_Controller"); // Import the authController module
const Contact_Controller = require("../Controllers/Contact_Controller");

const router = express.Router();

router.use(authController.protect);

router.post("/", Contact_Controller.Create_Spam_Contact);
router.get("/number/:number", Contact_Controller.search_via_numbers);
router.get("/name/:name", Contact_Controller.search_via_name);

module.exports = router;
