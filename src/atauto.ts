import process from 'process';

import { app, BrowserWindow, ipcMain } from 'electron';
import Configuration from './config';
import AttendanceAutomator from './automation';
import * as Log from './log';
import RendererClickEventArgs from 'rendererClickEventArgs';
import ClockType from 'clocktype';

const createWindow = (): void => {
  const window = new BrowserWindow({
    width: 550,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
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

ipcMain.on('clock', async (_: Electron.IpcMainEvent, arg: RendererClickEventArgs) => {
  // Destructure the argument
  const { clockType, config, timeString } = arg;

  // Initializs the automator with the config
  const attSystem = new AttendanceAutomator(config, true);
  await attSystem.init();

  // Depending on action clock in or out
  switch (clockType as ClockType) {
    case 'clockin':
      await attSystem.addActions(...AttendanceAutomator.ClockinActionsList);
      break;
    case 'clockout':
      await attSystem.addActions(...AttendanceAutomator.ClockoutActionsList);
      break;
  }

  // Execute and, when done, destroy the puppeteer'd Chrome
  await attSystem.executeActions();
  await attSystem.deinit();
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
};

main();
*/
