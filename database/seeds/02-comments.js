const faker = require('faker')
faker.seed(4321)

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('comments').insert([
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
    {
      comment: faker.hacker.phrase(),
      negativity_score: faker.random.number({ max: 20000, min: 5000, precision: 1 }),
      user_id: faker.random.number({ max: 10, min: 1, precision: 1 }),
    },
  ]);
};
