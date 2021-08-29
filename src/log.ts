import chalk from 'chalk';

const logError = (message?: any): void => {
  console.error(chalk.bold.red(message));
};

const logSuccess = (message?: any): void => {
  console.log(chalk.green(message));
};

export { logError, logSuccess };
