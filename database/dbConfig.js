const knex = require('knex');

const knexConfig = require('../knexfile.js');

//dynamically adjust the knexconfig base on the enviroment 
const enviroment = DB_ENV || 'development'

module.exports = knex(knexConfig[enviroment]);
