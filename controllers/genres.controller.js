// const { genres } = require("../db");
const { Genres, Movies } = require("../models/model");

const castController = {
    getAllGenres: async (req, res) => {
        try {
            const allGenres = await Genres.find();
            res.status(200).json(allGenres);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addGenres: async (req, res) => {
        try {
            const existGenres = await Genres.findOne({ name: req.body.name});

            if(existGenres) {
                res.status(401).json({msg: "Genres already exists"});
                return;
            }
            const newGenres = await Genres.create(req.body);
            
            res.status(200).json({msg: "Added genres successfully", genres: newGenres});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAGenres:  async (req, res) => {
        try {
            const genr = await Genres.findById(req.params.id).populate("films", "title cast year");
            res.status(200).json(genr);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateGenres: async (req, res) => {
        try {
            const genUpdated = await Genres.findByIdAndUpdate(req.params.id, req.body);

            res.status(200).json({ msg: "Updated successfully", gen: genUpdated});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteGenres: async (req, res) => {
        try {
            await Movies.updateMany({ genres: req.params.id}, { $set: {genres: null}});
            const genDeleted = await Genres.findByIdAndDelete(req.params.id);
            
            if(genDeleted) {
                res.status(200).json({ msg: "Deleted successfully", gen: genDeleted});
            } else {
                res.status(500).json({ msg: "Genr not exits"});
                return;
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = castController;