// libraries imports
const router = require("express").Router()

// file imports
const Users = require("./users-model.js")
const restricted = require("../auth/authenticate-middleware")
const Comments = require('../comments/comments-model')

// user endpoints
// get user data
router.get("/", restricted, async (req, res, next) => {
  try {
    console.log(`in get /`)
    const users = await Users.find()

    if (users.length) {
      res.status(200).json(users)
    }
    else {
      res.status(404).json({ message: 'no users at the moment' })
    }
  } catch (error) {
    next(error)
  }
})
router.get('/:id', restricted, validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
})

router.get('/:id/comments', restricted, validateUserId, async (req, res, next) => {
  try {
    let userData = await Users.findById(req.params.id)
    const userComments = await Users.userCommentsById(req.params.id)
    userData = {
      ...userData,
      userComments
    }
    delete userData.password
    if (userComments.length) {
      res.status(200).json(userData)
    } else {
      res.status(404).json({ message: 'User has no comment' })
    }
  } catch (error) {
    next(error)
  }

})

//update user information
router.put("/:id", restricted, validateUpdateData, validateUserId, (req, res, next) => {
  Users.updateUser(req.params.id, req.body)
    .then(updatedUser => {
      delete updatedUser.password
      res.status(200).json({ updatedUser })
    })
    .catch(next)
})

//delete user data
// can add a trestriction that only the user can delete it self

router.delete("/:id", restricted, validateUserId, (req, res, next) => {

  //take away the returning password
  delete req.user.password

  Users.deleteUser(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `The user and their messages have been deleted.`
      })
    })
    .catch(next)
})

// user favorites comments
router.get('/:id/favoritecomments', restricted, validateUserId, async (req, res, next) => {
  try {
    let userData = await Users.findById(req.params.id)
    const userFavoriteComments = await Users.findUserFavoriteComments(req.params.id)
    userData = {
      ...userData,
      userFavoriteComments
    }
    delete userData.password
    if (userFavoriteComments.length) {
      res.status(200).json(userData)
    } else {
      res.status(404).json({ message: 'User has no favorite comments' })
    }
  } catch (error) {
    next(error)
  }

})
router.post('/:id/favoritecomments/:comment_id', restricted, validateUserId, async (req, res, next) => {
  try {
    // validate commend ID
    const comment = await Comments.findById(req.params.comment_id)
    comment ? null : res.status(404).json({ error: `Invalid ID` })

    const addedUserFavoriteComment = await Users.addUserFavoriteComment(req.params.id, comment.id)

    res.status(200).json({ message: `Successfully added comment to has a favorite `, addedUserFavoriteComment })
  } catch (error) {
    next(error)
  }

})

// can add a trestriction that only the user can delete it's own favorite comment
router.delete('/:id/favoritecomments/:comment_id', restricted, validateUserId, async (req, res, next) => {
  try {
    const deletedUserFavoriteComment = await Users.deleteUserFavoriteComment(req.params.id, req.params.comment_id)

    res.status(200).json({ message: `Successfully added comment to has a favorite `, deletedUserFavoriteComment })
  } catch (error) {
    next(error)
  }

})


// local middleware
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
        delete user.password
        req.user = user
        next()
      } else {
        res.status(404).json({ error: `Invalid ID` })
      }
    })
    .catch(next)
}
module.exports = router
