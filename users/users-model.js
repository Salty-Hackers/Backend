const db = require("../database/dbConfig")

module.exports = {
  add,
  find,
  findBy,
  findById,
  userComments,
}
function userComments () {
  return db("users as u")
  .select("u.id", "u.first_name as firstName", 'u.last_name as lastName', 'u.email', 'c.comment', 'c.negativity as negativityScore')
  .join('comments as c', 'u.id', 'c.user_id') 
  .orderBy("id")
  
}
function find() {
  return db("users").select("id", "first_name", 'last_name', 'email').orderBy("id")
}

function findBy(filter) {
  // console.log(`-- user model inside findBy --`)
  // console.log(filter)
  
  return db("users")
  .where(filter)
  .orderBy("id")
}


async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id")

    return findById(id)
  } catch (error) {
    throw error
  }
}

function findById(id) {
  return db("users").where({ id }).first()
}