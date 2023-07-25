const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('eboms', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      bom_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      revision: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bom_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      bom_type: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false
      },
      user_created: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      master: {
        type: DataTypes.BOOLEAN,
      },
      master_id: {
        type: DataTypes.INTEGER,
        refrences: {
          model: 'eboms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_name: {
        type: DataTypes.TEXT,
      },
      drawing_no: {
        type: DataTypes.TEXT,
      },
      drawing_page: {
        type: DataTypes.TEXT
      },
      order_code: {
        type: DataTypes.TEXT
      },
      order_sub_code: {
        type: DataTypes.TEXT
      }
    })
    await queryInterface.createTable('ebom_items', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    })
    await queryInterface.createTable('technical_items', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('ebom_items')
    await queryInterface.dropTable('eboms')
    await queryInterface.dropTable('technical_items')
  }
}