const supertest = require("supertest")

const authRouter = require("../api/server")
const db = require("../database/dbConfig")
const { expectCt } = require("helmet")
beforeAll(async () => {
    // todo: verify that all the calls are being run has expected
    // how to migrate, and run seed on js
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()

})
describe('authRouter', () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })

    describe(`post /singup`, () => {

        it(`should respond 200 when right amount of data is given`, () => {
            // expect(true).toBe(true)

            return supertest(authRouter)
                .post(`/api/auth/signup`)
                .send({
                    first_name: 'royer',
                    last_name: 'adames',
                    email: 'testing2@hotmail.com',
                    password: 'admin',
                })
                .then(res => {
                    console.log(res.body)
                    expect(res.status).toBe(201)
                    // expect(res.status).toBe(404)
                    // expect(res.body.message).toMatch(/User sucessfully made./i)

                })
        })
        it(`should respond 404 when password is not a string`, () => {

        })
        it(`should respond 404 when there is no password`, () => {

        })
        it(`should respond 404 when there is no email`, () => {

        })
        it(`should respond 404 when there is no first_name`, () => {

        })
        it(`should respond 404 when there is no last_name`, () => {

        })
    })
    describe(`post /login`, () => {
        it(``, () => {

        })
        it(``, () => {

        })
        it(``, () => {

        })
        it(``, () => {

        })
    })
}) 