import puppeteer from 'puppeteer';

import Configuration from '../Config';

export default abstract class Action {
  abstract get actionName(): string;

  async performAction(_1: puppeteer.Page, _2: Configuration): Promise<void> {
    // Default implementation
    console.log(`Default performAction() called for action ${this.actionName}`);

    return;
  }
}
