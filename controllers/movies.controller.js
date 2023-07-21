const {movies} = require("../db");

const moviesController = {
    addMovie: (req, res) => {
        try {
            req.body.id = Date.now();
            const newMovie = req.body;
            movies.push(newMovie);
            res.status(200).json({msg: "Added movies successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllMovies: (req, res) => {
        try {
            if(!movies) {
                res.status(404).json({msg: "All movies not found"});
                return;
            }
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAMovie: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const user = movies.find(item => item.id === id);
            if(!user) {
                res.status(404).json({msg: "Not found movie"});
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateMovie: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            req.body.id = id;
            const newMovie = req.body;
            const userUpdated = movies.findIndex(item => item.id === id);
            if(userUpdated === -1) {
                res.status(404).json({msg: "The movie update is not found"});
                return;
            }
            movies.splice(userUpdated, 1, newMovie);
            
            res.status(200).json({msg: "Updated successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteMovie: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const deletedMovie = movies.findIndex(item => item.id === id);
            if(deletedMovie === -1) {
                res.status(404).json({msg: "The movie delete is not found"});
                return;
            }
            movies.splice(deletedMovie, 1);
            
            res.status(200).json({msg: "Deleted successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = moviesController;