const express = require("express");
const Auth_Controller = require("../Controllers/Auth_Controller");

const router = express.Router();

router.post("/signup", Auth_Controller.signup);
router.post("/login", Auth_Controller.login);
router.get("/logout", Auth_Controller.logout);

module.exports = router;
