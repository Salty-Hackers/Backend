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
it.todo(`test the case when there is no comments`)

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
it(`/:id put 200`, async () => {
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