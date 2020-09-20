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
router.get('/:id/comments', restricted, (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.findAUserCommentsById(req.params.id)
    .then(users => {

      // console.log(`inside findBy`)
      // console.log(users)

      if (users.length) {
        res.status(200).json(users)
      } else {
        res.status(404).json({ message: 'User has no comment' })
      }
    })
    .catch(next)
})
router.get('/:id', restricted, validateId, (req, res, next) => {
  // console.log('users get /')

  res.status(200).json(req.user)


})
router.post("/", restricted, validateData, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.add(req.body)
    .then(() => {

      // console.log(`inside findBy`)
      // console.log(users)

      res.status(201).end()

    })
    .catch(next)
})
router.delete("/:id", restricted, validateId, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  //take away the returning password
  req.user.password = ``

  Users.deleteUser(req.params.id)
    .then(() => {

      // console.log(`inside deleteUser`)
      // console.log(DeleteUser)

      res.status(200).json({
          message: `The user and their messages have been deleted.`
        })

    })
    .catch(next)
})
router.put("/:id", restricted, validateId, (req, res, next) => {

})
function validateData(req, res, next) {

  if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password) {
    res.status(404).json({ error: `first_name, last_name, email, and password are require` })
  }

  const email = {
    email: req.body.email
  }
  Users.findBy(email)
    .then(([user]) => {
      if (user) {
        res.status(404).json({ error: `Email not unique` })
      } else {
        next()
      }
    })
    .catch(next)


}

function validateId(req, res, next) {
  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        //get users store and pass it down to the other router so they don't have to make a 2 call
        req.user = user
        next()
      } else {
        res.status(404).json({ error: `Invalid ID` })
      }
    })
    .catch(next)
}
module.exports = router
