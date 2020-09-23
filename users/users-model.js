const db = require("../database/dbConfig")

module.exports = {
  add,
  find,
  findBy,
  findById,
  findUserFavoriteComments,
  findUsersComments,
  deleteUser,
  userCommentsById,
  updateUser,

}

function findUserFavoriteComments(id) {
  return db("users as u")
    .select('c.*')
    .join('comments as c', 'u.id', 'c.user_id')
    .orderBy("u.id")
    .where({ 'u.id': id, 'favorite': true })
}
async function updateUser(id, newUserData) {
  await db("users")
    .where({ id })
    .update(newUserData)
  return findById(id)
}
function userCommentsById(id) {
  return db("users as u")
    .select('c.*')
    .join('comments as c', 'u.id', 'c.user_id')
    .orderBy("u.id")
    .where({ 'u.id': id })
}
async function deleteUser(id) {

  try {
    // const deleteUserAndComments = await findAUserCommentsById(id)

    // delete the user and their comments
    const deleteUserAndComments = await db("users")
      .where({ id })
      .del()
    await db("comments")
      .where({ user_id: id })
      .del()

    return deleteUserAndComments
  } catch (error) {
    throw error

  }
}
function findUsersComments() {
  return db("users as u")
    .select("u.id", 'c.negativity_score as negativityScore', 'c.comment')
    .join('comments as c', 'u.id', 'c.user_id')
    .orderBy("u.id")

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
  return db("users")
    .where({ id })
    .first()
}