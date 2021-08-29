import process from "process";

import yargs from "yargs";

import Configuration from "./config";
import * as Log from "./log";

const main = async () => {
  const options = yargs(process.argv.slice(2))
    .option({
      a: { type: "string", demandOption: true, alias: "action" },
      c: { type: "string", alias: "config", default: "./atauto.conf" },
    })
    .parseSync();

  // Load configuration
  const config = new Configuration();
  try {
    await config.loadConfig(options.c);
    Log.success(`Loaded config file ${options.c}`);
  } catch (error) {
    Log.error(`${error.message}`);
    return;
  }

  // Check action
  if (options.a === "clockin") {
    console.log("Clocking in...");
  } else if (options.a === "clockout") {
    console.log("Clocking out...");
  }
};

main();
