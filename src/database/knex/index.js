const config = require("../../../knexfile");
const knek = require( "knex");

const connection = knex(config.development);

module.exports = connection;