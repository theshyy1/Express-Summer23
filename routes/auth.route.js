const router = require("express").Router();
const AuthController = require("../controllers/auth.controller")
const validate = require("../validation/auth.validate");

router.post("/signup", validate.authValidate, AuthController.signup);

router.post("/login", AuthController.postLogin);

module.exports = router;