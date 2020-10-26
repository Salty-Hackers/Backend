const bcryptjs = require("bcryptjs")

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables
  // changing faker.internet.password() for `testpassword`
  let users = [
    {
      first_name: "Antone",
      last_name: "Corkery",
      email: "Narciso28@hotmail.com",
      password: "$2a$08$2.A6usmg5EuEHz49vrGXx.iMjNQXrZRG4gZLzBIcuJXyilTux9P6y",
    },
    {
      first_name: "Noemy",
      last_name: "Dickinson",
      email: "Wilfred_Rosenbaum@hotmail.com",
      password: "$2a$08$/hfVLY.0vWSWzwgm7erTYOurylEeJUlmOz5LTbykTEYm0cwsdYkPq",
    },
    {
      first_name: "Niko",
      last_name: "Murazik",
      email: "Geovany61@gmail.com",
      password: "$2a$08$qD5fRpis0/BPe0xeh78QruwGgK4KA1obm4q1Adpo.hYCHLrr2C7oy",
    },

  ]
  return knex("users")
    .insert(users)
};
