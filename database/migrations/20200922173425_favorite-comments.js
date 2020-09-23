
exports.up = function (knex) {
    return knex.schema.createTable('comments', comments => {
        comments.increments()

        comments.integer('user_id')
            .unsigned()
            .notNullable()
            .references('users.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        comments.integer('comment_id')
            .unsigned()
            .notNullable()
            .references('comments.id')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments')
}
