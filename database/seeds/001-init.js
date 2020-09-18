exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "admin", 
      password: "admin", 
    },
    {
      username: "royer", 
      password: "two", 
    },
    {
      username: "Austin", 
      password: "three", 
    },
    
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
