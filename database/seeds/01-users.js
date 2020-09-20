const faker = require('faker')
faker.seed(4321)
const bcryptjs = require("bcryptjs")

exports.seed = function (knex) {
    // 000-cleanup.js already cleaned out all tables

    let users = [
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
        {
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcryptjs.hashSync(faker.internet.password(), 8),
        },
      ]
    return knex("users")
        .insert(users)
        .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
