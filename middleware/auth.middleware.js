const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
    const token = req.cookies['token-cookie'];
    // console.log(token);
    if(token) {
        jwt.verify(token, "myaccesstoken", (err, user) => {  //user == token {id, admin...}
            if(err) {
                res.status(403).json({msg: "Token is invalid"});
                return;
            }

            if(!user.admin) {
                res.status(403).json({msg: "You're not allowed to access this"});
                return;
            }

            next();
        })
    } else {
        res.status(401).json({msg: "You're not authenticated"});
        return;
    }
}