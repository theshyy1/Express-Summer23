const Joi = require("joi");

module.exports.castValidate = (req, res, next) => {
    const CastSchema = Joi.object({
        name: Joi.string().trim().required(),
        birthyear: Joi.string().required()
    })

    const { error } = CastSchema.validate(req.body);
    if(error) {
        res.status(400).json({msg: error.message});
        return;
    }

    next();
}