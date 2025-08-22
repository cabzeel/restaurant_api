const jwt = require('jsonwebtoken');

const identifier = (req, res, next) => {
    let token;

    if(req.headers.client === 'not-browser') {
        token = req.headers.authorization
    } else {
        token = req.cookies['Authorization']
    }

    if(!token) {
        return res.status(404).json({
            success : false,
            msg : 'unauthorized access'
        })
    }

    try {
        const userToken = token.split(' ')[1];
        const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

        if(jwtVerified) {
            req.user = jwtVerified;
            next();
        } else {
            throw new Error('error in the token')
        }
    } catch (error) {
        
    }
} 

module.exports = identifier