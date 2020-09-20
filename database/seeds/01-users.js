const faker = require('faker')
exports.seed = function (knex) {
    // 000-cleanup.js already cleaned out all tables

    let users = [
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      ]
      console.log(users)
    return knex("users")
        .insert(users)
        .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
