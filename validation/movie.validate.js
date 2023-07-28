const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().trim().required(),
    year: Joi.number().integer().required(),
    cast: Joi.array().items(Joi.string().required()).required(),
    genres: Joi.array().items(Joi.string().required()).required(),
    href: Joi.string().required(),
    extract: Joi.string().required(),
    thumbnail: Joi.string().required(),
});

module.exports.movieValidate = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if(error) {
        res.status(400).json({msg: error.message });
        return;
    }

    next();
}