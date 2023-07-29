const { Movies, Casts } = require("../models/model");
const { move } = require("../routes/movies.route");
 
const moviesController = {
    addMovie: async (req, res) => {
        try {  
            const movieExist = await Movies.findOne({ title: req.body.title});

            if(movieExist) {
                res.status(400).json({ msg: "Movie already exists"});
                return;
            }

            const newMovie = await Movies.create(req.body);
            // if(req.body.cast) {
            //     for(str of req.body.cast) {
            //         const cast = await Casts.findByIdAndUpdate(str, { $addToSet: { films: newMovie._id }})
            //     }
            // }
            if(req.body.cast) {
                await Casts.updateMany({ _id: req.body.cast}, { $addToSet: { films: newMovie._id }});
            }
            res.status(200).json({msg: "Added movies successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },

    search: async (req, res) => {
        try {
            const { q } = req.query;
            
            // await Movies.createIndexes({ "title": "text"}); // db.movies.createIndex({"title": "text"}); tao index trc khi searcb

            // const allMovies = await Movies.find();
            // const searchedMovies = allMovies.filter(mov => {
            //     return mov.title.toLowerCase().indexOf(q.toLowerCase().trim()) !== -1
            // });             
            const searchedMovies = await Movies.find({ $text: { $search: q}});

            res.status(200).json(searchedMovies);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllMovies: async (req, res) => {
        try {
            const allMovies = await Movies.find(); //filter, projection, option?
            res.status(200).json(allMovies);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAMovie: async (req, res) => {
        try {
            const movie = await Movies.findOne({ _id: req.params.id}).populate("cast");
            if(!movie) {
                res.status(500).json({msg: "Not found movie"});
                return;
            }
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateMovie: async (req, res) => {
        try {
            const updatedMovie = await Movies.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }); // req.body
            res.status(200).json({msg: "Updated successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteMovie: async (req, res) => {
        try {
            await Casts.updateMany({ films: req.params.id}, { $pull: { films: req.params.id }});
            const deletedMovie = await Movies.findByIdAndDelete(req.params.id);

            if(deletedMovie) {
                res.status(200).json({msg: "Deleted successfully"});
            }else {
                res.status(400).json({msg: "Movie not exists"});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = moviesController;