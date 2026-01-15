import { __schemaDirname } from '@easybooking/schema/dist/__schemaDirname';
import path from 'path';

import getKnexFor from './getKnexFor';

const globalSetup = async (): Promise<void> => {
  const perfStart = performance.now();

  const metaKnex = getKnexFor('postgres');
  const templateDatabase = 'easybooking_test_template';

  await metaKnex.raw('DROP DATABASE IF EXISTS ??', templateDatabase);
  await metaKnex.raw('CREATE DATABASE ??', templateDatabase);

  await metaKnex.destroy();

  const templateKnex = getKnexFor(templateDatabase);

  const migrationFolder = path.resolve(__schemaDirname, '*.*/migrations');
  await templateKnex.migrate.latest({ directory: migrationFolder });

  await templateKnex.destroy();

  const perfEnd = performance.now();
  const secondsSpent = ((perfEnd - perfStart) / 1000).toFixed(2);
  console.info(`Test DB template set up. Time: ${secondsSpent} seconds`);
};

export default globalSetup;
