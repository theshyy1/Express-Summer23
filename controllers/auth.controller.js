const { Users } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
    signup: async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;

            const userMatched = await Users.findOne({ email: email });
            if(userMatched) {
                res.status(400).json({ msg: "User already exists"});
                return;
            }
            
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await Users.create({ email, password: hashPassword, lastname, firstname});

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email: email});

            if(!user) {
                res.status(404).json({msg: "User is found"})
                return;
            }
            
            const match = bcrypt.compareSync(password, user.password);
            if(!match) {
                res.status(404).json({msg: "Password is incorrect"});
                return;
            }

            const accessToken = jwt.sign({
                id: user.id
            },
                "myaccesstoken",
                { expiresIn: "1m" } 
            )

            res.cookie("token-cookie", accessToken);

            // res.cookie("userID", user._id);
            res.status(200).json({msg: "Login successful", accessToken: accessToken});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = AuthController;