const db = require("../database/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById,
    deleteComment,
}




function find() {
    return db("comments").select('*').orderBy("id")
}

function findBy(filter) {
    // console.log(`-- user model inside findBy --`)
    // console.log(filter)

    return db("comments")
        .where(filter)
        .orderBy("id")
}


async function add(user) {
    try {
        const [id] = await db("comments").insert(user, "id")

        return findById(id)
    } catch (error) {
        throw error
    }
}

function findById(id) {
    return db("comments")
        .where({ id })
        .first()
}

async function deleteComment(id) {
    try {
        await db("comments")
            .where({ id })
            .del()
        return findById(id)
    } catch (error) {
        throw error
  
    }}