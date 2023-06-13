const authService = require('../services/authService')

const login = async(req, res) => {
  const { username, password } = req.body

  try {
    const token = await authService.login({ username, password })
    res.status(200).send({ token, username: user.username, name:`${user.firstName} ${user.lastName}` })
  } catch (err) {
    res.status(401).json({ error: 'Invalid username or password'})
  }
}

module.exports = { login }