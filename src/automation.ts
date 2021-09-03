/* eslint-disable @typescript-eslint/no-non-null-assertion */

import puppeteer from 'puppeteer';

import Configuration from './config';
import Action from './actions/action';
import LoginAction from './actions/loginAction';

export default class AttendanceAutomator {
  private _debug = false;
  private _browser?: puppeteer.Browser;
  private _page?: puppeteer.Page;
  private _config: Configuration;
  private _actions: Action[] = [];

  constructor(config: Configuration, debug: boolean) {
    this._debug = debug;
    this._config = config;
  }

  async init(): Promise<void> {
    this._browser = await puppeteer.launch({ headless: !this._debug });
    this._page = await this._browser.newPage();
  }

  async deinit(): Promise<void> {
    this._browser!.close();
  }

  async addActions<T extends Action>(...actions: T[]): Promise<void> {
    this._actions = this._actions.concat(actions);
  }

  async executeActions(): Promise<void> {
    for (const action of this._actions) {
      console.log(`Executing action: ${action.actionName}`);
      await action.performAction(this._page!, this._config);
    }
  }

  // Static list getters
  static get ClockinActionsList(): Action[] {
    return [new LoginAction()];
  }

  static get ClockoutActionsList(): Action[] {
    return [new LoginAction()];
  }
}
