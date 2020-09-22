const supertest = require("supertest")

const authRouter = require("../api/server")
const db = require("../database/dbConfig")
const { expectCt } = require("helmet")

describe('authRouter', () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })
    beforeAll(async () => {
        // trucate or empty the hobbits table
        // await db("users").truncate()
        // how to migrate, and run seed on js
        // await db.migrate.rollback()
        // .then(() => db.migrate.latest())
        // .then(() => db.seed.run());
    })
    describe(`post /singup`, () => {
        const newUserValidData = {
            first_name: 'royer',
            last_name: 'adames',
            email: 'Narciso28@hotmail.com',
            password: 'admin',
        }

        it(`should respond 200 when right amount of data is given`, () => {
            // expect(true).toBe(true)

            return supertest(authRouter)
                .post(`/api/auth/signup`)
                .send({
                    first_name: 'royer',
                    last_name: 'adames',
                    email: 'Narciso28@hotmail.com',
                    password: 'admin',
                })
                .then(res => {
                    console.log(res.body)
                    expect(res.status).toBe(200)
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