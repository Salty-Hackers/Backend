const db = require("../database/dbConfig")
const Comments = require('../comments/comments-model')
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
  addUserFavoriteComment,
  deleteUserFavoriteComment,
}
async function deleteUserFavoriteComment(user_id, comment_id) {
  try {
    const deletedComment = Comments.findById(comment_id)
    await db('favorite_comments')
      .where({ user_id, comment_id })
      .del()
    return deletedComment
  } catch (error) {
    return error
  }
}

async function addUserFavoriteComment(user_id, comment_id) {
  try {
    await db('favorite_comments')
      .insert({ user_id, comment_id })
    return Comments.findById(comment_id)
  } catch (error) {
    return error
  }
}
function findUserFavoriteComments(id) {
  return db("favorite_comments as fc")
    .select('c.*')
    .join('users as u', 'u.id', 'fc.user_id')
    .join('comments as c', 'c.id', 'fc.comment_id')
    .orderBy("c.id")
    .where({ 'u.id': id })
}
async function updateUser(id, newUserData) {
  await db("users")
    .where({ id })
    .update(newUserData)
  return findById(id)
}
function userCommentsById(id) {
  return db("comments")
    .select('comment')
    .where({ 'saltiest_hacker_id': id })
}
async function deleteUser(id) {

  try {
    // delete the user and their comments
    await db("comments")
      .where({ user_id: id })
      .del()
    const deleteUserAndComments = await db("users")
      .where({ id })
      .del()


    return deleteUserAndComments
  } catch (error) {
    return error

  }
}
function findUsersComments() {
  return db("users as u")
    .select("u.id", 'c.negativity_score as negativityScore', 'c.comment')
    .join('comments as c', 'u.id', 'c.saltiest_hacker_id')
    .orderBy("u.id")

}
function find() {
  return db("users").select("id", "first_name", 'last_name', 'email').orderBy("id")
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .orderBy("id")
}

async function add(user) {
  try {
    const [id] = await db("users").select("id", "first_name", "last_name", "email").insert(user, "id")

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