import express from 'express'
import path from 'path'
import compression from 'compression'

import users from './routes/users'
import rocks from './routes/rocks'
import votes from './routes/votes'

const server = express()

server.use(compression())
server.use(express.json())
server.use('/api/v1/users', users)
server.use('/api/v1/rocks', rocks)
server.use('/api/v1/votes', votes)

if (process.env.NODE_ENV === 'production') {
  server.use(path.join(__dirname, '/assets'), express.static(path.join(__dirname, '/assets')))
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  })
}
export default server
