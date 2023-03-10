const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/signup', async (req, res) => {
    const { username, name, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return response.status(400).json({
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

    response.status(201).json(savedUser)
})

// usersRouter.post('/', async (request, response) => {
//     const { username, name, password } = request.body

//     const existingUser = await User.findOne({ username })
//     if (existingUser) {
//         return response.status(400).json({
//             error: 'username must be unique'
//         })
//     }
    
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)

//     const user = new User ({
//         username,
//         name,
//         passwordHash,
//     })

//     const savedUser = await user.save()

//     response.status(201).json(savedUser)
// })

module.exports = usersRouter;