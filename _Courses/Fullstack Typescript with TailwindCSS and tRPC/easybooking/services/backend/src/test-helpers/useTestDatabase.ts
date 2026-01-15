import { performance } from 'perf_hooks';
import { afterAll, beforeAll, Suite } from 'vitest';

import { attachDb } from './getDb';
import getKnexFor from './getKnexFor';

const getFullSuiteName = (suite: Suite): string => {
  if (suite.suite) {
    const parentName = getFullSuiteName(suite.suite);
    return parentName + ' ' + suite.name + ' ' + suite.name;
  }
  return suite.name;
};
/**
 * Create a database with the data from test-org.md.
 * @param preserveAfterTest Set to true if you want the database to remain on disk after the test. Use for debugging.
 */
const useTestDatabase = (preserveAfterTest = false): (() => Knex) => {
  let templateConnection: Knex;
  let db: Knex;
  let dbName: string;

  beforeAll(async (meta) => {
    const perfStart = performance.now();

    const templateDbName = 'easybooking_test_template';
    templateConnection = getKnexFor(templateDbName);

    const fullSuiteName = getFullSuiteName(meta);
    dbName = 'test_' + fullSuiteName.replace(/\W+/g, '_');

    await templateConnection.raw('DROP DATABASE IF EXISTS ??', [dbName]);
    await templateConnection.raw('CREATE DATABASE ?? WITH TEMPLATE ??', [
      dbName,
      templateDbName,
    ]);

    const testKnex = getKnexFor(dbName);

    const perfEnd = performance.now();
    const duration = perfEnd - perfStart;
    if (duration > 2000) {
      console.warn(
        `Test-specific db cloned. Time: ${(duration / 1000).toFixed(2)} seconds`,
      );
    }

    attachDb(testKnex);

    db = testKnex;
  });
  afterAll(async () => {
    await db.destroy();

    if (preserveAfterTest) {
      console.info('Database preserved on disk: ' + dbName);
    } else {
      await templateConnection.raw('DROP DATABASE ??', [dbName]);
    }

    await templateConnection.destroy();
  });

  return () => db;
};

export default useTestDatabase;
