const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

let token

describe('authRouter', () => {
    beforeAll(async () => {
        // how to migrate, and run seed on js
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

describe(`userRouter`, () => {
    describe(`userRouter`, () => {
        describe(`get /`, () => {
            it(`should respond 401 when there is no authorization header`, async () => {
                const res = await supertest(server)
                    .get(`/api/users/`)
                expect(res.status).toBe(401)
                expect(res.body.message).toMatch(/No token/i)
            })
        })
    })
})