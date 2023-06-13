const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('rights', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      right: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      related_module: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    })
    await queryInterface.createTable('role_rights', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      right_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('role_rights')
    await queryInterface.dropTable('rights')
  }
}