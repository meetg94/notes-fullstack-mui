const jwt = require('jsonwebtoken')

const Note = require('../models/note')
const User = require('../models/user')

const KEY = `${process.env.SECRET}`

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

exports.getUserNotes = async (req, res) => {
  const token = getTokenFrom(req)

  const decodedToken = jwt.verify(token, KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  User.find({ _id: user })
    .populate("notes")
    .then(user => {
      res.json(user)
    })
}

exports.postUserNote = async (req, res) => {
  const { content, important } = req.body

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content,
    important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
}

exports.updateUserNote = async(req, res) => {
  const body = req.body
  
  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
}

exports.deleteUserNote = async(req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
}

// notesRouter.get('/', async (request, response) => {
//   const notes = await Note
//     .find({}).populate('user', { username: 1, name: 1 })
//   response.json(notes)
// })

// notesRouter.get('/:id', async (request, response) => {
//   const note = await Note.findById(request.params.id)

//   if (note) {
//     response.json(note.toJSON())
//   } else {
//     response.status(404).end()
//   }
// })

// notesRouter.post('/', async (request, response) => {
//   const { content, important } = request.body

//   const token = getTokenFrom(request)
//   const decodedToken = jwt.verify(token, process.env.SECRET)
//   if (!token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = await User.findById(decodedToken.id)

//   const note = new Note({
//     content,
//     important,
//     date: new Date(),
//     user: user._id
//   })

//   const savedNote = await note.save()
//   user.notes = user.notes.concat(savedNote._id)
//   await user.save()

//   response.status(201).json(savedNote)
// })

// notesRouter.delete('/:id', async (request, response) => {
//   await Note.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })

// notesRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })
