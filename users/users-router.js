const router = require("express").Router()

const Users = require("./users-model.js")
const restricted = require("../auth/authenticate-middleware")

router.get("/", restricted, (req, res) => {

  // console.log('users get /')
  // console.log(req.jwt)
  // console.log(req.jwt.department)
  
  const department = { department: req.jwt.department }
  Users.find(department)
    .then(users => {

      console.log(`inside findBy`)
      console.log(users)

      if (users.length) {
        res.status(200).json(users)
      } else {
        res.status(404).json({message: 'no users at the moment'})
      }
    })
    .catch(err => res.status(500).json(err.message))
})



module.exports = router
