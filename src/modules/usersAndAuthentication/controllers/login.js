const authService = require('../services/authService')

const login = async(req, res) => {
  const { username, password } = req.body

  try {
    const { token, user, firstName, lastName, roles } = await authService.login({ username, password })
    res.status(200).send({ token, user, firstName, lastName, roles })
  } catch (err) {
    res.status(401).json({ error: 'Invalid username or password' })
  }
}

module.exports = { login }