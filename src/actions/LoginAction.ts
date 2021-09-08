import puppeteer from 'puppeteer';

import Action from './Action';
import Configuration from 'config';

class LoginAction extends Action {
  get actionName(): string {
    return 'Login';
  }

  async performAction(page: puppeteer.Page, config: Configuration): Promise<void> {
    const USERNAME_SELECTOR = 'input[name="email"]';
    const PASSWORD_SELECTOR = 'input[name="password"]';

    await page.goto(config.url);
    await page.waitForSelector('input[name="email"]');

    // Input username
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(config.username);

    // Input password
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(config.password);

    const LOGIN_BUTTON_SELECTOR = '#image1';
    await page.click(LOGIN_BUTTON_SELECTOR);
  }
}

export default LoginAction;
