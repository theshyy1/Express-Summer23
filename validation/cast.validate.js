const Joi = require("joi");

const CastSchema = Joi.object({
    name: Joi.string().trim().required(),
    birthyear: Joi.string().required()
})
module.exports.castValidate = (req, res, next) => {

    const { error } = CastSchema.validate(req.body);
    if(error) {
        res.status(400).json({msg: error.message});
        return;
    }

    next();
}