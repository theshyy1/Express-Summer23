const router = require('express').Router();

const moviesController = require('../controllers/movies.controller');
const validate = require("../validation/movie.validate");

router.get("/", moviesController.getAllMovies);

router.post("/create", validate.movieValidate, moviesController.addMovie);

router.get("/search", moviesController.search);

router.get("/:id", moviesController.getAMovie);

router.put("/:id", validate.movieValidate, moviesController.updateMovie);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;