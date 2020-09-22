
exports.up = function (knex) {
    return knex.schema.table('comments', comments => {
        comments.boolean('favorite')
    })
};

exports.down = function (knex) {
    return knex.schema.table('comments', comments => {
        comments.dropColumn('favorite')
    })
}
