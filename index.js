require('dotenv').config()
require('./mongo')

const noteRouter = require('./controllers/notesRouter')
const userRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login')

const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')

const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())

/* Controllers */
app.use(noteRouter)
app.use(userRouter)
app.use(loginRouter)

/* Error Middlewares */
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`)
})
