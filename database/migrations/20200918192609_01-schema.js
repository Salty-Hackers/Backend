
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
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
            .unique()
            .index()

    })
        .createTable('comments', comments => {
            comments.increments()

            comments.text('comment')
                .notNullable()
                .index()
            comments.text('negativity')
                .notNullable()
                .index()
            comments.integer('user_id')
                .unsigned()
                .notNullable()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        }
        )
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments').dropTableIfExists('users')
}
