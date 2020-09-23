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
router.get('/:id/comments', restricted, validateUserId, async (req, res, next) => {
  try {
    let userData = await Users.findById(req.params.id)
    const userComments = await Users.userCommentsById(req.params.id)
    userData = {
      ...userData,
      userComments
    }
    if (userComments.length) {
      res.status(200).json(userData)
    } else {
      res.status(404).json({ message: 'User has no comment' })
    }
  } catch (error) {
    next(error)
  }

})
router.get('/:id/favoritecomments', restricted, validateUserId, async (req, res, next) => {
  try {
    let userData = await Users.findById(req.params.id)
    const userFavoriteComments = await Users.findUserFavoriteComments(req.params.id)
    userData = {
      ...userData,
      userFavoriteComments
    }
    if (userFavoriteComments.length) {
      res.status(200).json(userData)
    } else {
      res.status(404).json({ message: 'User has no favorite comments' })
    }
  } catch (error) {
    next(error)
  }

})
router.get('/:id', restricted, validateUserId, (req, res, next) => {
  // console.log('users get /')

  res.status(200).json(req.user)


})
router.post("/", restricted, validateEntryData, (req, res, next) => {

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
router.delete("/:id", restricted, validateUserId, (req, res, next) => {

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
router.put("/:id", restricted, validateUpdateData, validateUserId, (req, res, next) => {
  Users.updateUser(req.params.id, req.body)
    .then(updatedUser => {
      updatedUser.password = ``
      res.status(200).json({ updatedUser })
    })
    .catch(next)
})

function validateUpdateData(req, res, next) {
  if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password) {
    res.status(404).json({ error: `first_name, last_name, email, and password are require` })
  }
  next()
}
function validateEntryData(req, res, next) {

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

function validateUserId(req, res, next) {
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
