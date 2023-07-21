const { casts } = require("../db");

module.exports.castValidate = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).json({
            error: 'Name is required'
        })
    }

    next();
}