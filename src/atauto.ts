import process from 'process';

import { app, BrowserWindow } from 'electron';
import Configuration from './config';
import AttendanceAutomator from './automation';
import * as Log from './log';

const createWindow = (): void => {
  const window = new BrowserWindow({
    width: 550,
    height: 800,
    autoHideMenuBar: true,
  });

  window.loadFile('static/index.html');
};

app.whenReady().then(() => {
  createWindow();
});

// Mac-specific stuff
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/*
const main = async () => {
  // Load configuration
  const config = new Configuration();
  try {
    await config.loadConfig(options.c);
    Log.success(`Loaded config file ${options.c}`);
  } catch (error) {
    Log.error(`${error.message}`);
    return;
  }

  const attSystem = new AttendanceAutomator(config, options.d);
  await attSystem.init();

  // Depending on action clock in or out
  if (options.a === 'clockin') {
    await attSystem.addActions(...AttendanceAutomator.ClockinActionsList);
  } else if (options.a === 'clockout') {
    await attSystem.addActions(...AttendanceAutomator.ClockoutActionsList);
  }

  // Execute and, when done, destroy the puppeteer'd Chrome
  await attSystem.executeActions();
  await attSystem.deinit();

  Log.success('Done.');
};

main();
*/
