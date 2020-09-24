const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

let token

describe('/api/auth', () => {
    beforeAll(async () => {
        // how to run seed on js
        await db.seed.run()

    })
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toMatch(/testing/i)
        })
    })

    describe(`post /singup`, () => {

        it(`should respond 200 when right amount of data is given`, () => {
            // expect(true).toBe(true)

            return supertest(server)
                .post(`/api/auth/signup`)
                .send({
                    first_name: 'royer',
                    last_name: 'adames',
                    email: 'testing2@hotmail.com',
                    password: 'admin',
                })
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body.message).toBe(`User sucessfully made.`)
                })
        })
        it(`should respond 404 when password is not a string`, () => {
            return supertest(server)
                .post(`/api/auth/signup`)
                .send({
                    first_name: 'royer',
                    last_name: 'adames',
                    email: 'testing1@hotmail.com',
                    password: 1,
                })
                .then(res => {
                    expect(res.status).toBe(404)
                    expect(res.body.message).toMatch(/please provide username and password and the password shoud be alphanumeric/i)
                })
        })

    })
    describe(`post /login`, () => {
        it(`should return 404`, () => {
            return supertest(server)
                .post(`/api/auth/login`)
                .send({
                    email: 'Alexis_Keebler23@hotmail.com',
                    password: 'testpassword',
                })
                .then(res => {
                    console.log(res.body)
                    expect(res.status).toBe(404)
                    expect(res.body.message).toMatch(/Invalid credentials/i)
                })
        })
        it(`should return 200`, () => {
            return supertest(server)
                .post(`/api/auth/login`)
                .send({
                    email: 'Narciso28@hotmail.com',
                    password: 'testpassword',
                })
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body.user.firstName).toMatch(/Antone/i)
                    expect(res.body.user.lastName).toMatch(/Corkery/i)
                    token = res.body.token
                })
        })

    })
})

describe(`/api/users`, () => {
    describe(`validateUserId`, () => {
        it(`should check if the user didn't pass a valid user ID `, async () => {
            const res = await supertest(server)
                .get(`/api/users/notAnID`)
                .set(`authorization`, token)
            expect(res.status).toBe(404)
            expect(res.body.error).toMatch(/Invalid ID/i)
            expect(res.body).toEqual(expect.any(Object))

        })

    })
    describe(`get /`, () => {
        it(`should respond 401 when there is no authorization header`, async () => {
            const res = await supertest(server)
                .get(`/api/users/`)
            expect(res.status).toBe(401)
            expect(res.body.message).toMatch(/No token/i)
        })
        it(`should respond 200 when there is a valid authorization header`, async () => {
            const res = await supertest(server)
                .get(`/api/users/`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
        })
    })
    describe(`get /:id`, () => {
        it(`should respond 200 `, async () => {
            const res = await supertest(server)
                .get(`/api/users/1`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.password).toEqual(undefined)
            expect(res.body.id).toEqual(1)
            expect(res.body.first_name).toMatch(/Antone/i)
            expect(res.body.last_name).toMatch(/Corkery/i)
            expect(res.body.email).toMatch(/Narciso28@hotmail.com/i)
        })

    })
    describe(`get /comments`, () => {
        it(`should respond with 200 status `, async () => {
            const res = await supertest(server)
                .get(`/api/users/1/comments`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.password).toEqual(undefined)
            expect(res.body).toMatchObject({
                first_name: 'Antone',
                last_name: 'Corkery',
                email: 'Narciso28@hotmail.com',
            })
        })

    })
    describe(`/:id/favoritecomments`, () => {
        it(`should respond with 404 status `, async () => {
            const res = await supertest(server)
                .get(`/api/users/1/favoritecomments`)
                .set(`authorization`, token)
            expect(res.status).toBe(404)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.password).toEqual(undefined)
            expect(res.body).toMatchObject({
                message: /user has no favorite comments/i
            })
        })
        it(`should respond with 200 status `, async () => {
            const res = await supertest(server)
                .get(`/api/users/2/favoritecomments`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.userFavoriteComments).toEqual(expect.any(Array))
            expect(res.body.password).toEqual(undefined)
            expect(res.body.userFavoriteComments[0]).toMatchObject({
                comment: /The AGP bandwidth is down, connect the multi-byte card so we can calculate the SSL panel!/i
            })
        })

    })

    describe(`POST /:id/favoritecomments/:comment_id`, () => {
        it(`should respond fail `, async () => {
            const res = await supertest(server)
                .post(`/api/users/1/favoritecomments/a`)
                .set(`authorization`, token)
            expect(res.status).toBe(404)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.error).toEqual(expect.anything())
            expect(res.body.password).toEqual(undefined)
        })
        it(`should respond with 200 status `, async () => {
            const res = await supertest(server)
                .post(`/api/users/1/favoritecomments/16`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.addedUserFavoriteComment).toEqual(expect.anything())
            expect(res.body.password).toEqual(undefined)

        })

    })
    describe(`DELETE /:id/favoritecomments/:comment_id`, () => {
        it(`should respond with ok `, async () => {
            const res = await supertest(server)
                .delete(`/api/users/1/favoritecomments/16`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.message).toEqual(expect.anything())
            expect(res.body.deletedUserFavoriteComment).toEqual(expect.anything())
            expect(res.body.deletedUserFavoriteComment.comment).toEqual(expect.anything())
            expect(res.body.deletedUserFavoriteComment.negativity_score).toEqual(expect.anything())
            expect(res.body.password).toEqual(undefined)

        })

    })
    describe(`DELETE /:id`, () => {
        it(`should respond with ok `, async () => {
            const res = await supertest(server)
                .delete(`/api/users/1`)
                .set(`authorization`, token)
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.message).toEqual(expect.anything())
            expect(res.body.password).toEqual(undefined)

        })

    })
    describe(`UPDATE a user`, () => {
        it(`should respond with ok `, async () => {
            const res = await supertest(server)
                .put(`/api/users/4`)
                .set(`authorization`, token)
                .send({
                    first_name: 'Lambda',
                    last_name: 'was here',
                    email: 'Cyrus_Hahn@gmail.com'
                })
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            expect(res.body.updatedUser.id).toEqual(expect.anything())
            expect(res.body.updatedUser.first_name).toEqual(expect.anything())
            expect(res.body.updatedUser.last_name).toEqual(expect.anything())
            expect(res.body.updatedUser.email).toEqual(expect.anything())
            expect(res.body.updatedUser.password).toEqual(undefined)

        })

    })
})

describe(`api/comments`, () => {
    describe(`/`, () => {
        it(`should successed`, async () => {
            const res = await supertest(server)
                .get(`/api/comments/`)
                .set(`authorization`, token)

            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
            expect(res.body[0].id).toEqual(expect.anything())
            expect(res.body[0].user_id).toEqual(expect.anything())
            expect(res.body[0].comment).toEqual(expect.anything())
            expect(res.body[0].negativity_score).toEqual(expect.anything())
        })
    })
})