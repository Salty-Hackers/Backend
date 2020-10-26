const server = require("../api/server")
const request = require("supertest")

//prep Test Database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication
const restrict = require("../auth/authenticate-middleware")
jest.mock("../auth/authenticate-middleware")

//apply a static state for all tests
beforeEach(prepTestDB)

// Clear the mock for each test
beforeEach(() => restrict.mockClear())

describe("Users_router", () => {
    it("get /", async () => {
        jest.setTimeout(60000)
        const res = await request(server)
            .get("/api/users/")

        expect(res.status).toBe(400)
    })
})