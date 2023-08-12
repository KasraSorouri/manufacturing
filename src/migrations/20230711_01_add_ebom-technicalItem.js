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
      ebom_id: {
        type: DataTypes.INTEGER,
        refrences: {
          model: 'eboms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
          model: 'technical_items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      qty: {
        type: DataTypes.NUMERIC,
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'No'
      },
      qty_changable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      spesification: {
        type: DataTypes.JSON
      },
      sub_module: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      relation_type: {
        type: DataTypes.ENUM('link','copy'),
        allowNull: function () {
          return this.subModule === false
        },
      },
      related_to: {
        type: DataTypes.INTEGER,
        allowNull: function () {
          return this.subModule === false
        }
      },
      note : {
        type: DataTypes.JSON
      }
    })
    await queryInterface.createTable('tech_items', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      technical_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      technical_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      specifications: {
        type: DataTypes.JSON
      },
      unit: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'No'
      },
      alternative_unit: {
        type: DataTypes.TEXT,
      },
      subordinate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      supply_type: {
        type: DataTypes.ENUM('BUY','MAKE'),
        defaultValue: 'BUY'
      },
      related_bom: {
        type: DataTypes.INTEGER,
        allowNull: function () {
          return this.supply_type !== 'MAKE'
        }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    })
    await queryInterface.createTable('tech_item_subordinations', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      master_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tech_items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subordinate_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tech_items',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('ebom_items')
    await queryInterface.dropTable('eboms')
    await queryInterface.dropTable('tech_item_subordinations')
    await queryInterface.dropTable('tech_items')
  }
}