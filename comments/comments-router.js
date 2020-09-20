const router = require("express").Router()

const Comments = require("./comments-model")

router.get("/",  (req, res, next) => {

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

router.get('/:id',  (req, res, next) => {
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

router.post('/', validateData, (req, res, next) => {
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

function validateData (req, res, next) {
    if (!req.body.comment && !req.body.negativityScore && !req.body.user_id) {
        res.status(404).json({error: `comment, negative score, and the id of the user who made the comment`})
    }
    next()
}

module.exports = router
