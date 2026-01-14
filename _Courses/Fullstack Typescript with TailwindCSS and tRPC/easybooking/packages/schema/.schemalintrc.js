const knexConfig = require('./knexfile');

module.exports = {
  connection: knexConfig.development.connection,

  rules: {
    'name-casing': ['error', 'snake'],
    'name-inflection': ['error', 'singular'],
    'prefer-jsonb-to-json': ['error'],
    'prefer-text-to-varchar': ['error'],
    'prefer-identity-to-serial': ['error'],
  },

  schemas: [{ name: 'public' }],

  ignores: [
    { identifierPattern: 'public\\.knex_migrations.*', rulePattern: '.*' },
  ],
};
