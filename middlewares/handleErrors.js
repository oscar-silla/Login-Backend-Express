const handleErrors = (error, request, response, next) => {
  console.log(error.name)
  switch (error.name) {
    case 'CastError': response.status(400).json({ error: 'Invalid id.' })
      break
    default: response.status(500).json({ error: 'Internal error.' })
      break
  }
}

module.exports = handleErrors
