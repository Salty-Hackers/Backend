
exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments()

            table.text('first_name')
                .notNullable()
            table.text('last_name')
                .notNullable()
            table.text('email')
                .notNullable()
                .unique()
                .index()
            table.text('password')
                .notNullable()
                .index()

        })
        .createTable('saltiest_hackers', table => {
            table.increments()

            table.text('username')
                .notNullable()
            table.text('total_score')
                .notNullable()
            table.integer('user_id')
                .unsigned()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
        .createTable('comments', table => {
            table.increments()
            table.text('comment')
                .notNullable()
            table.integer('saltiest_hacker_id')
                .unsigned()
                .notNullable()
                .references('saltiest_hackers.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })

        .createTable('favorite_comments', comments => {
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
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("favorite_comments")
        .dropTableIfExists("comments")
        .dropTableIfExists("saltiest_hackers")
        .dropTableIfExists("users")
}
