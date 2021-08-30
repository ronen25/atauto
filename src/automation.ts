import puppeteer from 'puppeteer';

import Configuration from 'config';

export default class AttendanceAutomator {
  private _debug = false;
  private _browser: puppeteer.Browser | null = null;
  private _config: Configuration;

  constructor(config: Configuration, debug = false) {
    this._debug = debug;
    this._config = config;
  }

  async init(): Promise<void> {
    this._browser = await puppeteer.launch({ headless: !this._debug });
    const page = await this._browser.newPage();
  }

  async deinit(): Promise<void> {
    this._browser?.close();
  }
}
