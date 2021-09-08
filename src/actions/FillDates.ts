import puppeteer from 'puppeteer';

import Action from './Action';
import Configuration from 'config';
import ClockType from '../clocktype';

class FillDatesAction extends Action {
  private _clockType: ClockType;

  constructor(clockType: ClockType) {
    super();
    this._clockType = clockType;
  }

  get actionName(): string {
    return 'Fill dates';
  }

  async performAction(page: puppeteer.Page, config: Configuration): Promise<void> {
    const START_HH = '#time_start_HH_1';
    const START_MM = '#time_start_MM_1';
    const END_HH = '#time_end_HH_1';
    const END_MM = '#time_end_MM_1';
    const SAVE_BUTTON = '#save_btn';

    type InputSelectors = { hh: string; mm: string };

    let selectors: InputSelectors = { hh: '', mm: '' };

    // Based on the clock type we modify our selectors
    if (this._clockType === 'clockin') {
      selectors = { hh: START_HH, mm: START_MM };
    } else if (this._clockType === 'clockout') {
      selectors = { hh: END_HH, mm: END_MM };
    }

    // Fill current date and time string
    await page.waitForSelector(selectors.hh);
    await page.focus(selectors.hh);
    await page.keyboard.type(config.hours);

    await page.focus(selectors.mm);
    await page.keyboard.type(config.minutes);

    await page.click(SAVE_BUTTON);
  }
}

export default FillDatesAction;
