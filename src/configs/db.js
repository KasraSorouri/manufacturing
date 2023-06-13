const Sequelize = require('sequelize')
const { DATABASE_URI } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
const logger = require('../utils/logger')


const sequelize = new Sequelize(DATABASE_URI)

const migrationConf = {
  migrations: {
    glob: './src/migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migration' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigration = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  logger.info('migration up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigration()
    logger.info('Connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }