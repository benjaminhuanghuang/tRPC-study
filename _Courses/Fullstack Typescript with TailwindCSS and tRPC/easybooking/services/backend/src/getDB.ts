// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../packages/schema/src/models/knex-tables.ts" />

import knex, { Knex } from 'knex';

let _db: Knex | undefined;

const getDb = (): Knex => {
  if (!_db) {
    _db = knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'easybooking',
      },
    });
  }
  return _db;
};

export const attachDb = (db: Knex): void => {
  _db = db;
};

export default getDb;
