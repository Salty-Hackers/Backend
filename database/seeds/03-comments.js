const axios = require('axios')
const db = require('../dbConfig')
exports.seed = async function (knex) {
  try {
    // get all users
    const usernameList = await db('saltiest_hackers')
      .select(`id`, `username`)

    //get data from the DS app
    const commentsData = []

    // gets all comments from 100 username from saltiest_hackers 
    for (let index = 0; index < usernameList.length; index++) {
      const usernameObject = usernameList[index];
      //get user comments
      const { data } = await axios.post(`https://salted-hacker-news.herokuapp.com/comments?num_comments=-1`, {
        username: usernameObject.username,
      })
      //add to commentsData
      for (const key in data) {

        commentsData.push({
          comment: data[key],
          saltiest_hacker_id: usernameObject.id,
        })
      }
    }
    // Inserts seed entries
    return knex('comments').insert(commentsData)
  } catch (error) {
    throw error
  }


};
