const jwt = require('jsonwebtoken');
const config = require('./config');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization || req.params.token;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        alert('Your do not have credentials for this action');
        return;
    }
    jwt.verify(token, config.JWT_SECRET, (error, decode) => {
        if (error) {
            res.status(500).json({ message: "Token is not valid" });
            alert('Your credentials not valid for this action');
            return;
        }
        req.user = decode;
        next();
    });
};