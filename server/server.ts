import express from 'express'
import path from 'path'
import compression from 'compression' // import compression

import users from './routes/users'
import rocks from './routes/rocks'

const server = express()

server.use(compression()) // implement compression
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use('/api/v1/users', users)
server.use('/api/v1/rocks', rocks)

export default server
