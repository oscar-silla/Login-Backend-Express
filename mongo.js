const mongoose = require('mongoose')

mongoose.connect(process.env.BASE_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database is connected!'))
  .catch(err => console.log(err))
