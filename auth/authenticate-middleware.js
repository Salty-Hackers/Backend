/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {

  console.log(`inside restricted-middleware`)
  console.log(`Authorization: ` + req.headers.authorization)

  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      console.log(`inside verify`)
      if (err) {
        console.log(`inside if`)

        res.status(401).json({ message: "Not Allowed" });
      } else {
        console.log(`inside else`)

        req.jwt = decodedToken;
        console.log(req.jwt)
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token!" });
  }
};
