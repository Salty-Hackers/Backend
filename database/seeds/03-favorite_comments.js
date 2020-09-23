const faker = require('faker')
faker.seed(4321)

exports.seed = function (knex) {

  // Inserts seed entries
  return knex('favorite_comments').insert([
    {
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
      comment_id: faker.random.number({ max: 16, min: 1, precision: 1 }),
    },
    {
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
      comment_id: faker.random.number({ max: 16, min: 1, precision: 1 }),
    },
    {
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
      comment_id: faker.random.number({ max: 16, min: 1, precision: 1 }),
    },
    {
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
      comment_id: faker.random.number({ max: 16, min: 1, precision: 1 }),
    },
    {
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
      comment_id: faker.random.number({ max: 16, min: 1, precision: 1 }),
    },
  ]);
};
