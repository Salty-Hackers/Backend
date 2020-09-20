const faker = require('faker')
exports.seed = function (knex) {
    // 000-cleanup.js already cleaned out all tables

    let users = []
    function usersInitialDataSet(amountOfUsers = 20) {
        for(let i = 0; 0 < amountOfUsers; i++){
            users.push({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            })
        }
    }
    usersInitialDataSet(20)
    
    return knex("users")
        .insert(users)
        .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
