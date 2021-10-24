import puppeteer from 'puppeteer';

import Action from './Action';
import Configuration from '../Config';
import ClockType from 'Clocktype';

class WorkTypeSelectionAction extends Action {
  get actionName(): string {
    return 'WorkTypeSelectionAction';
  }

  async performAction(page: puppeteer.Page, _: Configuration, clockType: ClockType): Promise<void> {
    const WORK_TYPE_SELECTOR = '#fstjid_1';
    const WORK_SECONDARY_TYPE_SELECTOR = '#jid_1';

    // Nothing to do for clocking out, this is already selected
    if (clockType === 'clockout')
      return;

    // Click and select the WFH options
    await page.waitForSelector(WORK_TYPE_SELECTOR);
    await page.select(WORK_TYPE_SELECTOR, 'E-mail Security');

    // We can't simply select(), maybe because the option has Hebrew text?
    await page.waitForSelector(WORK_SECONDARY_TYPE_SELECTOR);
    await page.evaluate(() => {
      const element = document.querySelector('#jid_1') as unknown as HTMLSelectElement;
      element.selectedIndex = 1;
    });
  }
}

export default WorkTypeSelectionAction;
