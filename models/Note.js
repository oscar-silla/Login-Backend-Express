const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  done: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id
    delete objectReturned._id
    delete objectReturned.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
