/* eslint-disable no-console */
import chalk from 'chalk';

const WARN_PREFIX = chalk.bgRgb(255, 255, 0).bold.rgb(0, 0, 0)(' Warn ');
const INFO_PREFIX = chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(' Info ');
const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(' Error ');

export const logger = {
  warn(message: string) {
    console.log(`\n${WARN_PREFIX} ${chalk.yellow(message)}`);
  },
  info(message: string) {
    console.log(`\n${INFO_PREFIX} ${chalk.green(message)}`);
  },
  error(message: string) {
    console.log(`\n${ERROR_PREFIX} ${chalk.red(message)}`);
  },
};
