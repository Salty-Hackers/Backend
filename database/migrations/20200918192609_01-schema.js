
exports.up = function (knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments()

            users.text('first_name')
                .notNullable()
            users.text('last_name')
                .notNullable()
            users.text('email')
                .notNullable()
                .unique()
                .index()
            users.text('password')
                .notNullable()
                .index()

        })
        .createTable('comments', comments => {
            comments.increments()
            comments.integer('user_id')
                .unsigned()
                .notNullable()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            comments.text('comment')
                .notNullable()
            comments.integer('negativity_score')
                .notNullable()
                .unsigned()

        })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("comments").dropTableIfExists("users")
}
