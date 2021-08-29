import process from 'process';

import yargs from 'yargs';

import Configuration from './config';
import { logError, logSuccess } from './log';

const main = async () => {
  const options = yargs(process.argv.slice(2))
    .option({
      a: { type: 'string', demandOption: true, alias: 'action' },
      c: { type: 'string', alias: 'config', default: './atauto.conf' },
    })
    .parseSync();

  // Load configuration
  let config = new Configuration();
  try {
    await config.loadConfig(options.c);
    logSuccess(`Loaded config file ${options.c}`);
  } catch (error) {
    logError(`${error.message}`);
    return;
  }

  // Check action
  if (options.a === 'clockin') {
    console.log('Clocking in...');
  } else if (options.a === 'clockout') {
    console.log('Clocking out...');
  }
};

main();
