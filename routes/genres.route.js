const router = require('express').Router();

const castController = require('../controllers/genres.controller');
const validate = require("../validation/genres.validate");
const authMid = require("../middleware/auth.middleware");


router.get("/", castController.getAllGenres);

router.post("/create", authMid.authMiddleware, validate.genValidate, castController.addGenres);

router.get("/:id", castController.getAGenres);

router.put("/:id", authMid.authMiddleware, castController.updateGenres);

router.delete("/:id",authMid.authMiddleware, castController.deleteGenres);

module.exports = router;