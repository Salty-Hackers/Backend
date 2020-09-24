
exports.up = function (knex) {
    return knex.schema
        .createTable('saltiest_hackers', table => {
            table.increments()

            table.text('username')
                .notNullable()
            table.text('total_score')
                .notNullable()
            table.integer('comment_id')
                .unsigned()
                .notNullable()
                .references('comments.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
        .table('comments', table => {
            table.integer('saltiest_hacker_id')
                .unsigned()
                .references('saltiest_hackers.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("saltiest_hackers")
        .table('comments', comments => {
            comments.dropColumn('saltiest_hacker_id')
        })

};
