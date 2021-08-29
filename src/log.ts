import chalk from "chalk";

const error = (message?: unknown): void => {
  console.error(chalk.bold.red(message));
};

const success = (message?: unknown): void => {
  console.log(chalk.green(message));
};

export { error, success };
