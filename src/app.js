const express = require('express')
const cors = require('cors')

const loginRouter = require('./modules/usersAndAuthentication/routes/login')
const userRouter = require('./modules/usersAndAuthentication/routes/users')
const roleRouter = require('./modules/usersAndAuthentication/routes/roles')
const rightRouter = require('./modules/usersAndAuthentication/routes/rights')
const eBomRouter = require('./modules/bom/routes/eBom')
const techItem = require('./modules/bom/routes/techItem')
const eBomItem = require('./modules/bom/routes/eBomItem')


const app = express()
app.use(express.json(), cors())

app.use('/api/auth/login',loginRouter)
app.use('/api/auth/users',userRouter)
app.use('/api/auth/roles',roleRouter)
app.use('/api/auth/rights',rightRouter)

app.use('/api/boms/eboms',eBomRouter)
app.use('/api/boms/tech-items',techItem)
app.use('/api/boms/ebom-items',eBomItem)

module.exports = app