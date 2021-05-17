var jwt = require('jsonwebtoken')

module.exports = authVerify = (req, res, next) => {
    let token = req.headers['x-auth-token']
    console.log(req.headers)
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, 'decodedtoken', function (err, decoded) {
        if (err) {
            return res.send({ err });
        }
        console.log(decoded)
        req.user = decoded;
        next();
    });
}