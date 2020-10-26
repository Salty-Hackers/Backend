const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { isValid } = require("../users/users-service.js")
const Users = require("../users/users-model")

const router = require('express').Router()

// endpoints
router.post('/signup', async (req, res, next) => {
  // console.log(`inside singup router`)
  try {
    //validate all require fields
    if (
      !req.body.first_name &&
      !req.body.last_name &&
      !req.body.email &&
      !req.body.password
    ) {
      res.status(404).json({ error: `first_name, last_name, email, and password are require` })
    }

    // validate unique email
    const email = {
      email: req.body.email
    }
    const [user] = await Users.findBy(email)
    if (user) {
      res.status(404).json({ error: `Email not unique` })
    }

    // implement registration
    const credentials = req.body

    if (isValid(credentials)) {// check that I that the password is a string, and that the email exist
      const rounds = process.env.BCRYPT_ROUNDS || 8
      // hash the password
      const hash = bcryptjs.hashSync(credentials.password, rounds)
      credentials.password = hash

      // save the user to the database
      await Users.add(credentials)
      res.status(201).json({ message: `User sucessfully made.` })

    } else { //password is not a string or their is no email
      res.status(404).json({
        message: "please provide username and password and the password shoud be alphanumeric",
      })
    }
  } catch (error) {
    next(error)
  }

})

router.post('/login', async (req, res, next) => {
  // implement login
  const { email, password } = req.body

  if (isValid(req.body)) {
    try {
      const [user] = await Users.findBy({ email })

      // compare the password the hash stored in the database
      if (user && bcryptjs.compareSync(password, user.password)) {

        const token = makeJwt(user)

        res.status(200).json({
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          }, token
        })

      }
      else {
        console.log(`inside Users else`)
        res.status(404).json({ message: "Invalid credentials" })
      }
    } catch (error) { next(error) }

  }
  else {
    res.status(404).json({
      message: "please provide email and password and the password shoud be alphanumeric",
    })
  }
})

// local middleware
function makeJwt(payload) {
  const config = {
    jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  }
  const options = {
    expiresIn: "8 hours",
  }
  return jwt.sign(payload, config.jwtSecret, options)
}

module.exports = router
