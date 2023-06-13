const app = require('./app' )
const { PORT } = require('./configs/config')
const { connectToDatabase } = require('./configs/db')
const logger = require('./utils/logger')

const start = async() => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`)
  })
}

start()
