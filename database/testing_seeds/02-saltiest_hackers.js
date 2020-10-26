const axios = require('axios')



exports.seed = function (knex) {
  try {
    const saltiestHackerData = [
      {
        username: "tgroshon",
        total_score: -0.9978,
      },
      {
        username: "anonfornow",
        total_score: -0.9973,
      },
      {
        username: "I_dont_know",
        total_score: -0.997,
      },
      {
        username: "Mike999",
        total_score: -0.9967,
      },
      {
        username: "K6YtXAfA",
        total_score: -0.9956,
      },
    ]

    // Inserts seed entries
    return knex('saltiest_hackers').insert(saltiestHackerData)
  } catch (error) {
    throw error
  }

};
