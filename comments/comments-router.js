const router = require("express").Router()

const Comments = require("./comments-model")
const restricted = require("../auth/authenticate-middleware")

// users endpoints
router.get("/", restricted, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.find()
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

router.get('/:id', restricted, validateId, (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.findById(req.params.id)
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

router.post('/', restricted, validateData, (req, res, next) => {
  Comments.add(req.body)
    .then((addedComment) => {

      //   console.log(`inside findBy`)
      //   console.log(users)

      if (addedComment) {
        res.status(200).json(addedComment)
      } else {
        res.status(404).json({ message: 'no user comments found' })
      }
    })
    .catch(next)
})
router.delete("/:id", restricted, validateId, (req, res, next) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Users.deleteUser(req.params.id)
    .then((comment) => {

      // console.log(`inside findBy`)
      // console.log(users)

      if (comment) {
        //todo: take away the returning password
        res.status(200).json(comment)
      } else {
        res.status(404).json({ message: 'Invalid comment id' })
      }
    })
    .catch(next)
})

router.put("/:id", restricted, validateId, (req, res, next) => {

})

// local middleware
  function validateData(req, res, next) {
    if (!req.body.comment && !req.body.negativity && !req.body.user_id) {
      res.status(404).json({ error: `comment, negativity, and user_id are require` })
    }
    next()
  }
function validateId(req, res, next) {
    Users.deleteUser(req.params.id)
      .then((comment) => {
        if (comment) {
          next()
        } else {
          res.status(404).json({ error: `Invalid ID` })
        }
      })
      .catch(next)
  }
module.exports = router
