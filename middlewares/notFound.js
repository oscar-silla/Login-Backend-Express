const notFound = (request, response, next) => {
  response.status(404).json({ error: 'Not found!' })
  next()
}

module.exports = notFound
