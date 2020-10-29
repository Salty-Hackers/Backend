const server = require("../api/server")
const request = require("supertest")

//prep test database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication
const restrict = require("../auth/authenticate-middleware")
const supertest = require("supertest")
jest.mock("../auth/authenticate-middleware")

//apply a static state for all tests
beforeEach(prepTestDB)

// get all comments
it(`/ get 200`, async () => {
    const res = await request(server)
        .get(`/api/comments/`)

    expect(res.body).toEqual(expect.any(Array))
    expect(res.status).toBe(200)
    expect(res.body[0].id).toEqual(expect.anything())
    expect(res.body[0]).toEqual(expect.any(Object))
    expect(res.body[0].saltiest_hacker_id).toEqual(expect.anything())
    expect(res.body[0].comment).toEqual(expect.anything())
})
//no comments founds
it(`/ get 404 there is no comments`, async () => {

    //delete all comments
    await request(server).delete(`/api/comments/1`)
    await request(server).delete(`/api/comments/2`)
    await request(server).delete(`/api/comments/3`)
    await request(server).delete(`/api/comments/4`)
    await request(server).delete(`/api/comments/5`)
    await request(server).delete(`/api/comments/6`)

    const res = await request(server).get(`/api/comments/`)

    expect(res.body.message).toMatch(/no comments found/i)
    expect(res.status).toBe(404)
})

it(`/:id get 200`, async () => {
    const res = await request(server)
        .get(`/api/comments/1`)

    expect(res.body).toEqual(expect.any(Object))
    expect(res.status).toBe(200)
    expect(res.body.comment).toEqual(expect.anything())
    expect(res.body.id).toEqual(expect.anything())
    expect(res.body.saltiest_hacker_id).toEqual(expect.anything())
})
it(`validateCommentsId 404 not valid comment send`, async () => {
    const res = await request(server)
        .get(`/api/comments/not_a_comment_id`)

    expect(res.status).toBe(404)
    expect(res.body.error).toMatch(/not exist/i)
})
it(`put /:id 200`, async () => {
    const res = await request(server)
        .put(`/api/comments/4`)
        .send({
            comment: "comment change by royer",
            saltiest_hacker_id: "1"
        })

    expect(res.body.updateComment.comment).toMatch(/by royer/i)
    expect(res.body.updateComment.id).toBe(4)
    expect(res.body.updateComment.saltiest_hacker_id).toBe(1)
})

it(`delete /:id 200`, async () => {
    const res = await request(server)
        .delete(`/api/comments/4`)

    expect(res.body.deleteComment.comment).toMatch(/i hate/i)
    expect(res.body.deleteComment.id).toBe(4)
    expect(res.body.deleteComment.saltiest_hacker_id).toBe(4)
})
it(`post / 200`, async () => {
    const res = await request(server)
        .post(`/api/comments/`)
        .send({
            comment: "I am using supertest library and the jest library to test my node/express API endpoints",
            saltiest_hacker_id: 3
        })

    expect(res.body.comment).toMatch(/jest library/i)
    expect(res.body.id).toBe(7)
    expect(res.body.saltiest_hacker_id).toBe(3)
})