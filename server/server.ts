import express from 'express'
import path from 'path'

import users from './routes/users'
// import rocks from './routes/rocks'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/users', users)
// server.use('/api/v1/rocks', rocks)

export default server
