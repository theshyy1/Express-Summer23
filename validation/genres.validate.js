 module.exports.genValidate = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).json({
            msg: "Name is required"
        })
    }

    next();
}