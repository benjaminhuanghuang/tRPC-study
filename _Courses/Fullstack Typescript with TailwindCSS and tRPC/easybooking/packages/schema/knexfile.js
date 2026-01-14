const path = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'notesverb',
      password: 'notesverb123',
      database: 'notesverb',
      charset: 'utf8',
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
  },
};
