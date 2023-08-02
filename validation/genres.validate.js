const Joi = require("joi");

const GenSchema = Joi.object({
    name: Joi.string().trim().required(),
})

 module.exports.genValidate = (req, res, next) => {
    const { error } = GenSchema.validate(req.body);
    
    if(error) {
        res.status(401).json({msg: error.message});
        return;
    }
    next();
}