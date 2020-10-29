const server = require("../api/server")
const request = require("supertest")

//prep test database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication
const restrict = require("../auth/authenticate-middleware")
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