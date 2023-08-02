// const { casts} = require("../db");
const { Casts, Movies } = require("../models/model")

const castController = {
    getAllCasts: async (req, res) => {
        try {
            const allCasts = await Casts.find();
            res.status(200).json(allCasts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addCast: async (req, res) => {
        try {
            const existCast = await Casts.findOne({ name: req.body.name});

            if(existCast) {
                res.status(400).json({msg: "Cast already exists"});
                return;
            }
            const newCast = await Casts.create(req.body);
            res.status(200).json(newCast);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // FUll text search
    search: async (req, res) => {
        try {
            const { query_search} = req.query;
            console.log(query_search);
            await Casts.createIndexes({"name": "text"});

            const matchedCasts = await Casts.find({$text: {$search: query_search}});
            res.status(200).json(matchedCasts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getACast: async (req, res) => {
        try {
            const cast = await Casts.findById(req.params.id).populate("films", "title year genres cast");
            res.status(200).json(cast);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCast: async (req, res) => {
        try {
            const updateCast = await Casts.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ msg: "Updated successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCast: async (req, res) => {
        try {
            await Movies.updateMany({ cast: req.params.id }, { $pull: { cast: req.params.id }});
            const deleteCast = await Casts.findByIdAndDelete(req.params.id);
            
            if(deleteCast) {
                res.status(200).json({ msg: "Deleted successfully"});
            }else {
                res.status(404).json({ msg: "Cast not exist"});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = castController;