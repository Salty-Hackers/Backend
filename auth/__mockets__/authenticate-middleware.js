module.exports = jest.fn().mockImplementation((req, res, next) => {
    console.log(`inside restrict`)
    next()
})
