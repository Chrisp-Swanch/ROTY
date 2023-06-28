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
  server.use('/assets', express.static('../assets'))
  server.get('*', (req, res) => {
    res.sendFile('../index.html')
  })
}
export default server
