const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { isValid } = require("../users/users-service.js")
const Users = require("../users/users-model")

const router = require('express').Router()

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8
    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash
    // save the user to the database
    Users.add(credentials)
      .then(user => {
        const token = makeJwt(user)
        res.status(201).json({ data: user, token })
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(404).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    })
  }
})

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body
  
  // console.log(`***users post /login***`)
  // console.log(username)
  // console.log(password)

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {

        // console.log(`--inside findBy .then--`)
        // console.log(user)
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user)
          res.status(200).json({ token })
        } else {
          res.status(404).json({ message: "Invalid credentials" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(404).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    })
  }
})


function makeJwt(payload) {
  // const payload = {
  //   username,
  //   role,
  //   subject: id,
  // }
  const config = {
    jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  }
  const options = {
    expiresIn: "8 hours",
  }
  return jwt.sign(payload, config.jwtSecret, options)
}

module.exports = router
