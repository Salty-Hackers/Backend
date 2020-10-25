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

describe('post /signup', () => {
    it('should respond 200 with the right data', async () => {
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
})