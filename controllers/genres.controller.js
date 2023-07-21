const { genres } = require("../db");

const castController = {
    getAllGenres: (req, res) => {
        try {
            if(!genres) {
                res.status(404).json({errors: "No genres found"});
            }
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addGenres: (req, res) => {
        try {
            req.body.id = Date.now();
            const newGenres = req.body;

            const nameGen = genres.find(g => g.name === newGenres.name);

            if(nameGen) {
                res.status(404).json({errors: "This genres is already exists"});
                return;
            }

            genres.push(newGenres);
            res.status(200).json({msg: "Added genres successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAGenres: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const gen = genres.find(g => g.id === id);
            if(!gen) {
                res.status(404).json({ errors: "This gen is not found"});
            }

            res.status(200).json(gen);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateGenres: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            req.body.id = id;
            const newGenres = req.body;
            const gen = genres.findIndex(g => g.id === id);

            if(gen === -1) {
                res.status(404).json({ errors: "This gen is not found"});
            }
            genres.splice(gen, 1, newGenres);
            res.status(200).json({ msg: "Updated successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteGenres: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const gen = genres.findIndex(g => g.id === id);
            if(gen === -1) {
                res.status(404).json({ errors: "This gen is not found"});
            }
            genres.splice(gen, 1);
            res.status(200).json({ msg: "Deleted successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = castController;