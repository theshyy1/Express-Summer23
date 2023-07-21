const { casts} = require("../db");

const castController = {
    getAllCasts: (req, res) => {
        try {
            if(!casts) {
                res.status(404).json({message: "No casts found"});
            }
            res.status(200).json(casts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addCast: (req, res) => {
        try {
            req.body.id = Date.now();
            const newCast = req.body;
            casts.push(newCast);
            res.status(200).json({ msg: "Added cast successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getACast: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const cast = casts.find(cast => cast.id === id);
            if(!cast) {
                res.status(404).json({message: "This cast is not found"});
                return;
            }
            res.status(200).json(cast);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateCast: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            req.body.id = id;
            const newCast = req.body;
            const cast = casts.findIndex(cast => cast.id === id);

            if(cast === -1) {
                res.status(404).json({message: "This cast is not found"});
                return;
            }
            
            casts.splice(cast, 1, newCast);
            res.status(200).json({ msg: "Updated successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCast: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const cast = casts.findIndex(cast => cast.id === id);

            if(cast === -1) {
                res.status(404).json({message: "This cast is not found"});
                return;
            }

            casts.splice(cast, 1);
            res.status(200).json({ msg: "Deleted successfully"});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = castController;