import process from 'process';

import yargs from 'yargs';

import Configuration from './config';
import AttendanceAutomator from 'automation';
import * as Log from './log';

const main = async () => {
  const options = yargs(process.argv.slice(2))
    .option({
      a: { type: 'string', demandOption: true, alias: 'action' },
      c: { type: 'string', alias: 'config', default: './atauto.conf' },
    })
    .parseSync();

  // Load configuration
  const config = new Configuration();
  try {
    await config.loadConfig(options.c);
    Log.success(`Loaded config file ${options.c}`);
  } catch (error) {
    Log.error(`${error.message}`);
    return;
  }

  const attSystem = new AttendanceAutomator(config);
  await attSystem.init();

  // Depending on action clock in or out
  await attSystem.startActions(options.a);

  await attSystem.deinit();
};

main();
