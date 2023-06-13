const { passwordHashMaker } = require('../modules/usersAndAuthentication/utils/userProcessor')
const { QueryTypes } = require('sequelize')

module.exports = {
  up: async ({ context:  queryInterface }) => {

    const userAdminExist = await queryInterface.sequelize.query(
      'SELECT * FROM users WHERE username = \'admin\'',
      { type: QueryTypes.SELECT }
    )

    if (userAdminExist.length === 0) {

      await queryInterface.bulkInsert('users', [{
        username: 'admin',
        password: await passwordHashMaker('secret'),
        first_name: '*',
        last_name: 'administrator',
        active: true,
        date_created: new Date()
      }],{})
    }

    const [roleAdminExist] = await queryInterface.sequelize.query(
      'SELECT * FROM roles WHERE role_name = \'Admin\'',
      { type: QueryTypes.SELECT }
    )

    if (!roleAdminExist) {
      await queryInterface.bulkInsert('roles', [{
        role_name: 'Admin',
        active: true,
      }], {})
    }

    const [userAdmin] = await queryInterface.sequelize.query(
      'SELECT * FROM users WHERE username = \'admin\'',
      { type: QueryTypes.SELECT }
    )

    const [roleAdmin] = await queryInterface.sequelize.query(
      'SELECT * FROM roles WHERE role_name = \'Admin\'',
      { type: QueryTypes.SELECT }
    )

    console.log('user admin ->', userAdmin.id, '   * role admin ->', roleAdmin.id)
    await queryInterface.bulkInsert('user_roles', [{
      user_id: userAdmin.id,
      role_id: roleAdmin.id,
    }],{})
  },

  down: async ({ context:  queryInterface }) => {
    const [userAdmin] = await queryInterface.sequelize.query(
      'SELECT * FROM users WHERE username = \'admin\'',
      { type: QueryTypes.SELECT }
    )

    if (userAdmin) {
      await Promise.all([
        queryInterface.bulkDelete('user_roles', { user_id: userAdmin.id }, {}),
        queryInterface.bulkDelete('users', { username: 'admin' }, {}),
        queryInterface.bulkDelete('roles', { role_name: 'Admin' }, {})
      ])
    }
  }
}
