
exports.up = function (knex) {
    return knex.schema.table('users', users => {
        users.bool('favorite')
    })
};

exports.down = function (knex) {

};
