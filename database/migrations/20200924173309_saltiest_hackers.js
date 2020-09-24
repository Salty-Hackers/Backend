
exports.up = function (knex) {
    return knex.schema
        .createTable('saltiest_hackers', users => {
            users.increments()

            users.text('username')
                .notNullable()
            users.text('total_score')
                .notNullable()
            users.integer('comment_id')
                .unsigned()
                .notNullable()
                .references('comments.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            users.integer('user_id')
                .unsigned()
                .notNullable()
                .references('users.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
        .table('comments', comments => {
            comments.integer('saltiest_hacker_id')
                .unsigned()
                .notNullable()
                .references('saltiest_hackers.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
};

exports.down = function (knex) {
    return knex.schema.table('comments', comments => {
        comments.dropColumn('saltiest_hacker_id')
    }).dropTableIfExists("users")

};
