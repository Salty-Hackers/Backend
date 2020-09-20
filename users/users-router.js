const router = require("express").Router()

const Users = require("./users-model.js")
const restricted = require("../auth/authenticate-middleware")

router.get("/", restricted, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.find()
    .then(users => {

      // console.log(`inside findBy`)
      // console.log(users)

      if (users.length) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'no users at the moment' })
      }
    })
    .catch(next)
})

router.get('/comments', restricted, (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.findUsersComments()
    .then(users => {

      // console.log(`inside findBy`)
      // console.log(users)

      if (users.length) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'no users at the moment' })
      }
    })
    .catch(next)
})
router.get('/:id', restricted, (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.findAUserComments(req.params.id)
    .then((users) => {

      console.log(`inside findBy`)
      console.log(users)

      if (users) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'no user comments found' })
      }
    })
    .catch(next)
})
router.post("/", restricted, validateData, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.add(req.body)
    .then(users => {

      // console.log(`inside findBy`)
      // console.log(users)

      if (users.length) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'no users at the moment' })
      }
    })
    .catch(next)
})

function validateData (req, res, next) {
  if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password) {
      res.status(404).json({error: `first_name, last_name, email, and password are require`})
  }
  next()
}

module.exports = router
