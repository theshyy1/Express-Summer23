const router = require('express').Router();

const moviesController = require('../controllers/movies.controller');
const validate = require("../validation/movie.validate");
const authMid = require("../middleware/auth.middleware");


router.get("/", moviesController.getAllMovies);

router.post("/create", authMid.authMiddleware, validate.movieValidate, moviesController.addMovie);

router.get("/search", moviesController.search);

router.get("/:id", moviesController.getAMovie);

router.put("/:id",authMid.authMiddleware, validate.movieValidate, moviesController.updateMovie);

router.delete("/:id",authMid.authMiddleware, moviesController.deleteMovie);

module.exports = router;