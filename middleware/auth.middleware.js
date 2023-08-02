const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
    const token = req.cookies['token-cookie'];
    // console.log(token);
    if(token) {
        jwt.verify(token, "myaccesstoken", (err, user) => {
            if(err) {
                res.status(403).json({msg: "Token is invalid"});
                return;
            }
            next();
        })
    } else {
        res.status(401).json({msg: "You're not authenticated"});
        return;
    }
}