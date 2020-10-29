const server = require("../api/server")
const request = require("supertest")

//prep Test Database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication
const restrict = require("../auth/authenticate-middleware")
const supertest = require("supertest")
const { post } = require("../api/server")
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

    it("validateUserId 400 not a valid ID was selected", async () => {
        const res = await request(server)
            .get("/api/users/not_a_number")
        expect(res.status).toBe(404)
        expect(res.body.error).toMatch(/invalid id/i)
    })
    it("get /:id 200", async () => {
        const res = await request(server)
            .get("/api/users/1")
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expect.any(Object))
        expect(res.body.id).toBe(1)
        expect(res.body.email).toMatch(/narciso28/i)
        expect(res.body.first_name).toMatch(/antone/i)
        expect(res.body.last_name).toMatch(/corkery/i)
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

    describe(`/:id/favoritescomments `, () => {
        it(`404 no favorite comments`, async () => {
            const res = await request(server).get(`/api/users/1/favoritecomments`)

            expect(res.body).toEqual(expect.any(Object))
            expect(res.status).toBe(404)
            expect(res.body.message).toMatch(/no favorite comments/i)
        })
        it(`200 User has favorite comments`, async () => {
            const res = await request(server).get(`/api/users/4/favoritecomments`)

            expect(res.body).toEqual(expect.any(Object))
            expect(res.status).toBe(200)
            expect(res.body.email).toMatch(/cyrus/i)
            expect(res.body.first_name).toMatch(/jayda/i)
            expect(res.body.userFavoriteComments).not.toBe(undefined)
        })
    })

    it(`post /:id/favoritecomments/:comment_id 200`, async () => {
        const res = await supertest(server).
            post(`/api/users/4/favoritecomments/1`)

        expect(res.body).toEqual(expect.any(Object))
        expect(res.status).toBe(200)
        expect(res.body.addedUserFavoriteComment).toEqual(expect.anything())
    })

    it(`delete /:id/favoritecomments/:comment_id 200`, async () => {
        const res = await supertest(server)
            .delete(`/api/users/4/favoritecomments/5`)

        expect(res.body).toEqual(expect.any(Object))
        expect(res.status).toBe(200)
        expect(res.body.deletedUserFavoriteComment).toEqual(expect.anything())
        expect(res.body.deletedUserFavoriteComment.comment).toEqual(expect.anything())
    })
    it(`delete /:id/favoritecomments/:comment_id 404 invalid id`, async () => {
        const res = await supertest(server)
            .delete(`/api/users/5/favoritecomments/1`)

        expect(res.status).toBe(404)
        expect(res.body.error).toMatch(/invalid id/i)

    })

    //delete a user by id
    it(`delete /:id 200`, async () => {
        const res = await supertest(server)
            .delete(`/api/users/1`)

        expect(res.status).toBe(200)
        expect(res.body.message).toMatch(/deleted/i)
    })

    //update a user
    it(`put 200 user updated`, async () => {
        const res = await supertest(server)
            .put(`/api/users/4`)
            .send({
                first_name: `royer`,
                last_name: `adames`,
                email: `was_here@gmail.com`
            })

        expect(res.status).toBe(200)
        expect(res.body.updatedUser.first_name).toMatch(/royer/i)
    })
})