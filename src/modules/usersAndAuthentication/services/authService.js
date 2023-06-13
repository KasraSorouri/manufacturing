const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt')

const { SECRET } = require('../../../configs/config')

const { User, Role, Right } = require('../models')

const login = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username: username
    },
    include: [{
      model: Role,
      attributes: ['roleName'],
      through: { attributes: [] },
      include: [{
        model: Right,
        attributes: ['right'],
        through: { attributes: [] },
      }]
    },],
  })

  const passwordCorrect = user === null ? false
    : await bcrypt.compare(password, user.password)

  if (!passwordCorrect) {
    throw new Error('invalid username or password!')
  }
  const roles = user.roles.map((role) => role.roleName)
  const rights = user.roles.flatMap((role) => role.rights.map((right) => right.right))

  const userForToken = {
    username: user.username,
    roles,
    rights,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  return token

}

module.exports = {
  login
}