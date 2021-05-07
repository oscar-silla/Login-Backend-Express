const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  if (authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }

  let decoded = {}
  try {
    decoded = jwt.verify(token, process.env.SECRET)
  } catch (e) {
    console.log(e)
  }

  if (!authorization || !decoded.userId) {
    response.status(401).json({ error: 'Authorization is missing' })
  }

  const { userId } = decoded

  request.userId = userId

  next()
}

module.exports = userExtractor
