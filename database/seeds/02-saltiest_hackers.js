const axios = require('axios')



exports.seed = async function (knex) {
  try {
    //get data from the DS app
    const { data } = await axios.post(`https://salted-hacker-news.herokuapp.com/saltiest-hackers`, {
      num_hackers: 100,
      min_comments: 1
    })
    //rebuild data in a way that the table accepts

    const saltiestHackerData = []
    for (const property in data) {
      saltiestHackerData.push({
        username: data[property][0],//username
        total_score: data[property][1],//total_Score
      })
    }
    // Inserts seed entries
    return knex('saltiest_hackers').insert(saltiestHackerData)
  } catch (error) {
    throw error
  }

};
