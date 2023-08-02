const router = require('express').Router();

const validate = require('../validation/cast.validate');
const castController = require('../controllers/casts.controller');

router.get("/", castController.getAllCasts);

router.post("/create", validate.castValidate, castController.addCast);

router.get("/search", castController.search);

router.get("/:id", castController.getACast);

router.put("/:id", castController.updateCast);

router.delete("/:id", castController.deleteCast);

module.exports = router;