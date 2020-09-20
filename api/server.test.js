const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

let lambdaUser
const austinsUser = {
    username: 'austins',
    password: 'passs',
}
let currentToken
describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })

    beforeAll(async () => {
        // trucate or empty the hobbits table
        await db("users").truncate()
        // how to migrate, and run seed on js
        // await db.migrate.rollback()
        // .then(() => db.migrate.latest())
        // .then(() => db.seed.run());
    })
    describe("Auth", () => {

        describe('auth-router', () => {
            describe('post /register', () => {
                it("should return 201 when passed correct data", () => {
                    return supertest(server)
                        .post("/api/auth/register")
                        .send(austinsUser)
                        .then(res => {
                            expect(res.status).toBe(201)
                            lambdaUser = res.body
                            currentToken = res.body.token
                        })
                })
                it('should return 400 when passed wrong data', () => {
                    return supertest(server)
                        .post("/api/auth/register")
                        .send({ username: 1, password: 1 })
                        .then(res => {
                            expect(res.status).toBe(404)
                        })
                })
            })
            describe('post /login', () => {
                it("should return 201 when passed correct data", () => {
                    // console.log(austinsUser.username)
                    // console.log(austinsUser.password)
                    return supertest(server)
                        .post("/api/auth/login")
                        .send(austinsUser)
                        .then(res => {
                            expect(res.status).toBe(200)
                        })
                })
                it('should return 400 when Invalid credentials', () => {
                    return supertest(server)
                        .post("/api/auth/login")
                        .send({ username: 1, password: 1 })
                        .then(res => {
                            expect(res.status).toBe(404)
                        })
                })
            })



        })



    })
    describe(`/users`, () => {
        describe(`/api/users/`, () => {
            it("should return 401 when there is no authorization header being pass", () => {
                return supertest(server)
                    .get("/api/users/")
                    .send(austinsUser)
                    .then(res => {
                        expect(res.status).toBe(401)
                    })
            })
            it("should return No token! when there is no authorization header token ", () => {
                return supertest(server)
                    .get("/api/users/")
                    .send(austinsUser)
                    .then(res => {
                        expect(res.body.message).toMatch(/no token!/i)
                    })
            })

        })

    })
    describe(`jokes-route`, () => {
        it(`should return 200`, () => {
            console.log(currentToken)
            return supertest(server)
            .get(`/api/jokes`)
            .set('authorization', currentToken) 
            .then( (res) => {
                expect(res.status).toBe(200)
            })
        })
        // it(`should return respond with jokes`, () => {
        //     return supertest(server)
        //     .get(`/api/jokes`)
        //     .set('authorization', currentToken) 
        //     .then( (res) => {
        //         const jokes ={
        //             id: true, joke: true
        //         }
        //         expect(res.body).toContainEqual(jokes)
        //     })
        // })
    })
    // describe("Users GET /", () => {
    //     it("should return HTTP status code 200", () => {
    //         return supertest(server)
    //             .get("/")
    //             .then(res => {
    //                 expect(res.status).toBe(200)
    //             })
    //     })

    //     it("should return JSON", async () => {
    //         const res = await supertest(server).get("/")

    //         expect(res.type).toMatch(/json/i)
    //     })


    // })

})
