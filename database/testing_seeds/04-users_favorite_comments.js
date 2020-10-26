const faker = require('faker')
faker.seed(4321)

exports.seed = function (knex) {

  // Inserts seed entries
  return knex('favorite_comments').insert([
    {
      user_id: 1,
      comment_id: 6,
    },
    {
      user_id: 2,
      comment_id: 3,
    },
    {
      user_id: 2,
      comment_id: 6,
    },
    {
      user_id: 4,
      comment_id: 5,
    },
    {
      user_id: 3,
      comment_id: 2,
    },
  ]);
};
