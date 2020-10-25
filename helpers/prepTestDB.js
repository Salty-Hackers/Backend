const db = require("../database/dbConfig")

module.exports = () => {
    return db.migrate.roolback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
}