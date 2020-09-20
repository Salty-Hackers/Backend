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

router.get('/comments',  (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.findUsersComments()
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
router.post('/:id',  (req, res, next) => {
  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)

  Comments.findAUserComments(req.params.id)
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


module.exports = router
