const server = require("../api/server")
const request = require("supertest")

//prep Test Database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication
const restrict = require("../auth/authenticate-middleware")
const supertest = require("supertest")
jest.mock("../auth/authenticate-middleware")

//apply a static state for all tests
beforeEach(prepTestDB)

// Clear the mock for each test
beforeEach(() => restrict.mockClear())

describe("/api/users", () => {

    it("get / 200", async () => {
        const res = await request(server)
            .get("/api/users/")
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.any(Array))
    })

    describe("get /:id ", () => {
        it("200", async () => {
            const res = await request(server)
                .get("/api/users/1")
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.id).toBe(1)
            expect(res.body.email).toMatch(/narciso28/i)
            expect(res.body.first_name).toMatch(/antone/i)
            expect(res.body.last_name).toMatch(/corkery/i)
        })
        it("400", async () => {
            const res = await request(server)
                .get("/api/users/not_a_number")
            expect(res.status).toBe(404)
            expect(res.body.error).toMatch(/invalid id/i)
        })
    })

    it("get /comments 200", async () => {
        const res = await supertest(server)
            .get(`/api/users/4/comments`)


        expect(res.body).toEqual(expect.any(Object))
        expect(res.status).toBe(200)

        expect(res.body.email).toMatch(/yrus_Hahn/i)
        expect(res.body.first_name).toMatch(/Jayda/i)
        expect(res.body.last_name).toMatch(/Koelpin/i)
        expect(res.body.password).not.toEqual(expect.any(String))
    })


})