import puppeteer from 'puppeteer';

import Configuration from 'config';
import Action from 'actions/action';
import LoginAction from 'actions/loginAction';

export default class AttendanceAutomator {
  private _debug = false;
  private _browser: puppeteer.Browser | null = null;
  private _page: puppeteer.Page | null = null;
  private _config: Configuration;
  private _actions: Action[] = [];

  constructor(config: Configuration, debug = false) {
    this._debug = debug;
    this._config = config;
  }

  async init(): Promise<void> {
    this._browser = await puppeteer.launch({ headless: !this._debug });
    this._page = await this._browser.newPage();
  }

  async deinit(): Promise<void> {
    this._browser?.close();
  }

  async addActions<T extends Action>(...actions: T[]): Promise<void> {
    this._actions = this._actions.concat(actions);
  }

  async executeActions(): Promise<void> {
    return; // TODO
  }

  // Static list getters
  static get ClockinActionsList(): Action[] {
    return [new LoginAction()];
  }

  static get ClockoutActionsList(): Action[] {
    return [new LoginAction()];
  }
}
