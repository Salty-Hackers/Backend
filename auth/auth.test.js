const server = require('../api/server')
const request = require('supertest')

// prep Test Database
const prepTestDB = require("../helpers/prepTestDB")

//mock authentication 
const restrict = require("./authenticate-middleware")
jest.mock("./authenticate-middleware")

//apply a static state for all tests
beforeEach(prepTestDB)

// Clear the mock for each test
beforeEach(() => restrict.mockClear())

describe('Auth_router', () => {
    it('post /signup ', async () => {
        const res = await request(server)
            .post(`/api/auth/signup`)
            .send({
                first_name: 'royer',
                last_name: 'adames',
                email: 'testing2@hotmail.com',
                password: 'admin',
            })
        expect(res.status).toBe(201)
        expect(res.body.message).toBe(`User sucessfully made.`)
    })
    it('post /login ', async () => {
        const res = await request(server)
            .post(`/api/auth/login`)
            .send({
                email: 'Narciso28@hotmail.com',
                password: 'testpassword',
            })
        expect(res.status).toBe(200)
    })
    it('post /login 404 invalid credentials', async () => {
        const res = await request(server)
            .post(`/api/auth/login`)
            .send({
                email: 'Narciso28@hotmail.com',
                password: 'admin',
            })
        expect(res.status).toBe(404)
        expect(res.body.message).toMatch(/Invalid credentials/i)
    })
    it('post /login 404 no password and email', async () => {
        const res = await request(server)
            .post(`/api/auth/login`)
            .send({
                email: '',
                password: '',
            })
        expect(res.status).toBe(404)
        expect(res.body.message).toMatch(/email and password/i)
    })
})