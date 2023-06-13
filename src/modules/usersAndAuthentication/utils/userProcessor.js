const bcrypt = require('bcrypt')

const passwordHashMaker = async(password) => {
  const saltRound = 10
  const passwordHash = await bcrypt.hash(password,saltRound)
  return passwordHash
}

const userProcessor = async(userData) => {
  const newUser = {
    username: userData.username,
    password: await passwordHashMaker(userData.password),
    firstName: userData.firstName,
    lastName: userData.lastName,
    active: userData.active || false,
    dateCreated: new Date(),
    roleId: userData.roleId
  }
  return newUser
}
module.exports = {
  passwordHashMaker,
  userProcessor
}