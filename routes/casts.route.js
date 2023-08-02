const router = require('express').Router();

const validate = require('../validation/cast.validate');
const castController = require('../controllers/casts.controller');
const authMid = require("../middleware/auth.middleware");

router.get("/", castController.getAllCasts);

router.post("/create",authMid.authMiddleware, validate.castValidate, castController.addCast);

router.get("/search", castController.search);

router.get("/:id", castController.getACast);

router.put("/:id",authMid.authMiddleware, castController.updateCast);

router.delete("/:id", authMid.authMiddleware, castController.deleteCast);

module.exports = router;