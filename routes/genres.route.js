const router = require('express').Router();

const castController = require('../controllers/genres.controller');
const validate = require("../validation/genres.validate");

router.get("/", castController.getAllGenres);

router.post("/create", validate.genValidate, castController.addGenres);

router.get("/:id", castController.getAGenres);

router.put("/:id", castController.updateGenres);

router.delete("/:id", castController.deleteGenres);

module.exports = router;