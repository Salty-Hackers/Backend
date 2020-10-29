const router = require("express").Router()

const Comments = require("./comments-model")
const restricted = require("../auth/authenticate-middleware")

// Comments endpoints
router.get("/", restricted, async (req, res, next) => {
  try {
    const comments = await Comments.find()
    if (comments.length) {
      res.status(200).json(comments)
    } else {
      res.status(404).json({ message: 'no comments found' })
    }
  } catch (error) {
    next(error)
  }

})

router.get('/:id', restricted, validateCommentsId, async (req, res, next) => {
  res.status(200).json(req.comment)

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
router.delete("/:id", restricted, validateCommentsId, (req, res, next) => {

  // console.log('Comments get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.deleteComment(req.params.id)
    .then((deleteComment) => {

      // console.log(`inside findBy`)
      // console.log(deleteComment)

      //take away the returning password
      res.status(200).json({ deleteComment })

    })
    .catch(next)
})

router.put("/:id", restricted, validateData, validateCommentsId, async (req, res, next) => {
  try {
    const updateComment = await Comments.updateComment(req.params.id, req.body)
    res.status(200).json({ updateComment })
  } catch (error) {
    next(error)
  }

})



// local middleware
function validateData(req, res, next) {
  if (!req.body.comment && !req.body.negativity && !req.body.user_id) {
    res.status(404).json({ error: `comment, negativity, and user_id are require` })
  }
  next()
}
async function validateCommentsId(req, res, next) {
  try {
    const comment = await Comments.findById(req.params.id)
    if (comment) {
      req.comment = comment
      next()
    } else {
      res.status(404).json({ error: `Comment does not exist` })
    }
  } catch (error) {
    next(error)
  }

}
module.exports = router

