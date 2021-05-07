const noteRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

/* GET */
noteRouter.get('/notes', (request, response, next) => {
  Note.find().populate('user', {
    username: 1,
    name: 1
  })
    .then(notes => response.status(200).json(notes))
    .catch(err => next(err))
})

/* GET - ID */
noteRouter.get('/notes/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => {
      if (note) {
        response.status(200).json(note)
      } else {
        response.status(404).json({ error: 'Not found!' })
      }
    })
    .catch(err => next(err))
})

/* POST */
noteRouter.post('/notes', userExtractor, async (request, response, next) => {
  const {
    content,
    done = false
  } = request.body

  const { userId } = request

  const user = await User.findById(userId)

  if (!user) {
    response.status(404).json({ error: 'user not found!' })
  }

  const newNote = {
    content,
    date: new Date().toISOString(),
    done,
    user: userId
  }

  const note = new Note(newNote)
  user.notes = user.notes.concat(note._id)
  await user.save()
  await note.save()
    .then(note => response.status(201).json(note))
    .catch(err => next(err))
})

/* PUT */
noteRouter.put('/notes/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const { body } = request

  Note.findByIdAndUpdate(id, body, { new: true })
    .then(noteUpdated => {
      if (noteUpdated) {
        response.status(200).json(noteUpdated)
      } else {
        response.status(404).json({ error: 'Note not found!' })
      }
    })
    .catch(err => next(err))
})

/* DELETE */
noteRouter.delete('/notes/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(noteDeleted => {
      if (noteDeleted) {
        response.status(204).json(noteDeleted)
      } else {
        response.status(404).json({ error: 'Note not found!' })
      }
    })
    .catch(err => next(err))
})

module.exports = noteRouter
