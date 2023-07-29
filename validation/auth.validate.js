const Joi = require("joi");

const AuthSchema = Joi.object({
    firstname: Joi.string().trim().required().messages({
        "string.empty": "Not allowed empty string",
    }),
    lastname: Joi.string().trim().required().messages({
        "string.empty": "Not allowed empty string",
    }),
    email: Joi.string().email().pattern(/@fpt.edu.vn$/).min(15).required().messages({
        "string.empty": "Email is required",
        "string.email": "Not format",
        "string.min": "Email is very short",
        "string.pattern.base": "Not match with email pattern"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password is very short",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirmpassword does not match with password",
        "string.empty": "Confirm password is required"
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