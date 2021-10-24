/* eslint-disable @typescript-eslint/no-non-null-assertion */

import puppeteer from 'puppeteer';

import Configuration from './Config';
import Action from './actions/Action';
import LoginAction from './actions/LoginAction';
import WorkTypeSelectionAction from './actions/WorkTypeSelection';
import FillDatesAction from './actions/FillDates';
import ClockType from 'Clocktype';

export default class AttendanceAutomator {
  private _debug = false;
  private _browser?: puppeteer.Browser;
  private _page?: puppeteer.Page;
  private _config: Configuration;
  private _actions: Action[] = [];

  DEBUG_DELAY = 50;

  constructor(config: Configuration, debug: boolean) {
    this._debug = debug;
    this._config = config;
  }

  async init(): Promise<void> {
    this._browser = await puppeteer.launch({
      headless: !this._debug,
      slowMo: this._debug ? this.DEBUG_DELAY : 0,
    });
    this._page = await this._browser.newPage();
  }

  async deinit(): Promise<void> {
    this._browser!.close();
  }

  async addActions<T extends Action>(...actions: T[]): Promise<void> {
    this._actions = this._actions.concat(actions);
  }

  async executeActions(clockType: ClockType): Promise<void> {
    for (const action of this._actions) {
      await action.performAction(this._page!, this._config, clockType);
    }
  }

  // Static list getters
  static get ClockinActionsList(): Action[] {
    return [
      new LoginAction(),
      new WorkTypeSelectionAction(),
      new FillDatesAction('clockin'),
    ];
  }

  static get ClockoutActionsList(): Action[] {
    return [
      new LoginAction(),
      new WorkTypeSelectionAction(),
      new FillDatesAction('clockout'),
    ];
  }
}
