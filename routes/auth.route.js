const router = require("express").Router();
const AuthController = require("../controllers/auth.controller")
const validate = require("../validation/auth.validate");

router.post("/signup", validate.authValidate, AuthController.signup);

router.post("/login", AuthController.postLogin);

// router.get("/cookie", (req, res) => {
//     res.cookie("UserId", "1234", {
//         signed: true
//     });
//     res.send("heelo")
// })

module.exports = router;