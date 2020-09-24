// libraries import
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

// file import
const authenticate = require('../auth/authenticate-middleware.js')
const authRouter = require('../auth/auth-router.js')
const userRouter = require(`../users/users-router`)
const commentsRouter = require(`../comments/comments-router`)

// start the server
const server = express()


// third-party middleware
server.use(helmet())
server.use(cors())
//built in middleware
server.use(express.json())
// error middleware
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: `Something went wrong, try again later`
    })
}
)

// custom middleware
server.use('/api/auth', authRouter)
server.use('/api/users', authenticate, userRouter)
server.use('/api/comments', authenticate, commentsRouter)
server.get('/', (req, res, next) => {
    res.status(200).json({ Message: `Server is up. See documentation at https://documenter.getpostman.com/view/11996006/TVKBZeKE#8dc53815-0741-43ef-9d12-937fc5b94b50` })
})

module.exports = server
