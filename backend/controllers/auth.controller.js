const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.signup = async (req, res) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User ({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
}

exports.signin = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

    res
        .status(200)
        .send({ token, username: user.username, name: user.name })
}