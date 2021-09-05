import puppeteer from 'puppeteer';

import Action from './action';
import Configuration from 'config';

class WorkTypeSelectionAction extends Action {
  get actionName(): string {
    return 'WorkTypeSelectionAction';
  }

  async performAction(page: puppeteer.Page, _: Configuration): Promise<void> {
    const WORK_TYPE_SELECTOR = '#fstjid_1';
    const WORK_SECONDARY_TYPE_SELECTOR = '#jid_1';

    await page.waitForSelector(WORK_TYPE_SELECTOR);

    // Click and select the first option
    await page.click(WORK_TYPE_SELECTOR);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Click and select the second option
    await page.click(WORK_SECONDARY_TYPE_SELECTOR);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
  }
}

export default WorkTypeSelectionAction;
