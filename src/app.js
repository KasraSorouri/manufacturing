const express = require('express')
const cors = require('cors')

const loginRouter = require('./modules/usersAndAuthentication/routes/login')
const userRouter = require('./modules/usersAndAuthentication/routes/users')
const roleRouter = require('./modules/usersAndAuthentication/routes/roles')
const rightRouter = require('./modules/usersAndAuthentication/routes/rights')
const eBomRouter = require('./modules/bom/routes/eBom')
const technicalItem = require('./modules/bom/routes/technicalItem')
const eBomItem = require('./modules/bom/routes/eBomItem')


const app = express()
app.use(express.json(), cors())

app.use('/api/auth/login',loginRouter)
app.use('/api/auth/user',userRouter)
app.use('/api/auth/role',roleRouter)
app.use('/api/auth/right',rightRouter)

app.use('/api/bom/ebom',eBomRouter)
app.use('/api/bom/tech-item',technicalItem)
app.use('/api/bom/ebom-item',eBomItem)

module.exports = app