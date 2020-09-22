const db = require("../database/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById,
    deleteComment,
    updateComment,
}

async function updateComment(id, newCommentData) {
    await db("comments")
        .where({ id })
        .update(newCommentData)
    return findById(id)
}


function find() {
    return db("comments")
        .select('*')
        .orderBy("id")
}

function findBy(filter) {
    // console.log(`-- comment model inside findBy --`)
    // console.log(filter)

    return db("comments")
        .where(filter)
        .orderBy("id")
}


async function add(comment) {
    try {
        const [id] = await db("comments").insert(comment, "id")

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
        const deletedComment = await findById(id)
        await db("comments")
            .where({ id })
            .del()
        return deletedComment
    } catch (error) {
        throw error

    }
}