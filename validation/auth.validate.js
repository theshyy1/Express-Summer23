const Joi = require("joi");

const AuthSchema = Joi.object({
    firstname: Joi.string().trim().required().messages({
        "string.empty": "Not allowed empty string",
    }),
    lastname: Joi.string().trim().required().messages({
        "string.empty": "Not allowed empty string",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Not allowed empty string",
        "string.email": "Not format"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Not allowed empty string",
        "string.min": "Min 8 characters",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Password does not match"
    })
})

module.exports.authValidate = (req, res, next) => {
    const { error } = AuthSchema.validate(req.body, { abortEarly: false});
    
    if(error) { 
        const messages = error.details.map(mess => mess.message);
        res.status(400).json(messages);
        return;
    }
    
    next();
}