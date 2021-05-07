const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id
    delete objectReturned._id
    delete objectReturned.__v
    delete objectReturned.password
  }
})

const User = model('User', userSchema)

module.exports = User
