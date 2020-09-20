const router = require("express").Router()

const Comments = require("./comments-model")
const restricted = require("../auth/authenticate-middleware")

// Comments endpoints
router.get("/", restricted, (req, res, next) => {

  // console.log('comments get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.find()
    .then(comments => {

      // console.log(`inside findBy`)
      // console.log(comments)

      if (comments.length) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({ message: 'no comments found' })
      }
    })
    .catch(next)
})

router.get('/:id', restricted, validateId, (req, res, next) => {
  // console.log('Comments get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.findById(req.params.id)
    .then((comment) => {

      // console.log(`inside findBy`)
      // console.log(comment)

      if (comment) {
        res.status(200).json(comment)
      } else {
        res.status(404).json({ message: 'no comment found' })
      }
    })
    .catch(next)
})

router.post('/', restricted, validateData, (req, res, next) => {
  Comments.add(req.body)
    .then((addedComment) => {

      //   console.log(`inside findBy`)
      //   console.log(addedComment)

      if (addedComment) {
        res.status(200).json(addedComment)
      } else {
        res.status(404).json({ message: 'no user comments found' })
      }
    })
    .catch(next)
})
router.delete("/:id", restricted, validateId, (req, res, next) => {

  // console.log('Comments get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.deleteUser(req.params.id)
    .then((deleteComment) => {

      // console.log(`inside findBy`)
      // console.log(deleteComment)

      //take away the returning password
      deletedUser.password = ``
      res.status(200).json({deleteComment} )

    })
    .catch(next)
})

router.put("/:id", restricted, validateData, validateId, (req, res, next) => {
  Comments.updateComment
    .then(updateComment => {
        res.status(200).json({updateComment})
    })
})

// local middleware
function validateData(req, res, next) {
  if (!req.body.comment && !req.body.negativity && !req.body.user_id) {
    res.status(404).json({ error: `comment, negativity, and user_id are require` })
  }
  next()
}
function validateId(req, res, next) {
  Comments.deleteUser(req.params.id)
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
