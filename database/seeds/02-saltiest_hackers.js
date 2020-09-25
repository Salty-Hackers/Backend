const axios = require('axios')
async function getDSSaltiestHackers() {
  try {
    //get data from the DS app
    const res = await axios.post(`https://salted-hacker-news.herokuapp.com/saltiest-hackers`, {
      num_hackers: 100,
      min_comments: 1
    })

    //rebuild data in a way that the table accepts

    const saltiestHackerData = []
    for (const property in res) {
      saltiestHackerData.push({
        username: res[property][0],//username
        total_score: res[property][1],//total_Score
      })
    }
    return saltiestHackerData
  } catch (error) {
    throw error
  }
}
console.log(getDSSaltiestHackers())

exports.seed = function (knex) {

  // Inserts seed entries
  return knex('saltiest_hackers').insert({
    username: 'testing',//username
    total_score: 1213,//total_Score
  })
};
