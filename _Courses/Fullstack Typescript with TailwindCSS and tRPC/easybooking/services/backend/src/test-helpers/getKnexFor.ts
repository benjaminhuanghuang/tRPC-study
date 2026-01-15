import knex, { Knex } from 'knex';

const getKnexFor = (database: string): Knex => {
  const instance = knex({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database,
    },
  });
  return instance;
};

export default getKnexFor;
