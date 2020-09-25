const faker = require('faker')
faker.seed(4321)
const axios = require('axios')
const db = require('../dbConfig')
exports.seed = async function (knex) {
  try {
    // get all users
    const usernameList = await db('saltiest_hackers')
      .select(`id`, `username`)
    console.log(usernameList)

    //get data from the DS app
    const commentsData = []
    // gets all comments from 100 username from saltiest_hackers 
    // usernameList.forEach(async usernameObject => {
    //   console.log(`inside forEach`)
    //   console.log(usernameObject.username)
    //   console.log(usernameObject.id)
    //   //get user comments
    //   const data = await axios.post(`https://salted-hacker-news.herokuapp.com/comments?num_comments=-1`, {
    //     username: usernameObject.username,
    //   })
    //   console.log(`After axios called`)
    //   // console.log(data)

    //   //add user information to commentsData
    //   for (const key in data) {
    //     console.log(`inside forIn`)

    //     commentsData.push({
    //       comment: data[key],
    //       saltiest_hacker_id: usernameObject.id,
    //     })
    //   }

    // })
    usernameList.forEach(usernameObject => {
      console.log(`inside forEach`)
      console.log(usernameObject.username)
      console.log(usernameObject.id)
      //get user comments
      axios.post(`https://salted-hacker-news.herokuapp.com/comments?num_comments=-1`, {
        username: usernameObject.username,
      })
        .then(({ data }) => {
          console.log(`After axios called`)
          // console.log(data)

          //add user information to commentsData
          for (const key in data) {
            console.log(`inside forIn`)

            commentsData.push({
              comment: data[key],
              saltiest_hacker_id: usernameObject.id,
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
    // console.log(commentsData);


    // console.log(usernameList[0].username);
    // console.log(usernameList[0].id);
    // const { data } = await axios.post(`https://salted-hacker-news.herokuapp.com/comments?num_comments=-1`, {
    //   username: usernameList[0].username,
    // })
    // console.log(data)

    // // loop through comments to add them all

    // for (const key in data) {
    //   commentsData.push({
    //     comment: data[key],
    //     saltiest_hacker_id: usernameList[0].id,
    //   })
    // }


    // Inserts seed entries
    return knex('comments').insert(commentsData)
  } catch (error) {
    throw error
  }


};
