const jwt = require('jsonwebtoken');
require('dotenv').config();
const Note = require('../models/note')
const User = require('../models/user')

const KEY = process.env.SECRET

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

verifyToken = (req, res, next) => {
    const token = getTokenFrom(req)

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        })
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            })
        }
    })  
    req.user = User.findById(decodedToken.id);
    next();

}