import process from 'process';

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import AttendanceAutomator from './Automation';
import RendererClickEventArgs from 'RendererClickEventArgs';
import ClockType from 'Clocktype';

let window: BrowserWindow;

const createWindow = (): void => {
  window = new BrowserWindow({
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

ipcMain.on('ui-error', (_: Electron.IpcMainEvent, args: string[]) => {
  const [title, message] = args;
  dialog.showErrorBox(title, message);
});

ipcMain.on('clock', async (_: Electron.IpcMainEvent, arg: RendererClickEventArgs) => {
  // Destructure the argument
  const { clockType, config } = arg;

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

  // Log done
  dialog.showMessageBox(window, {
    message: 'Clocking is completed successfully.',
    type: 'info',
    title: 'Success',
  });
});
