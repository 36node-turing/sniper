import fs from "fs";

import app from "./app";
import * as config from "./config";
import * as jobs from "./jobs";
import * as services from "./services";

export * from "./lib";
export * from "./constants";

export { app, config, jobs, services };

/**
 * make sure folder created
 */
if (!fs.existsSync(config.SCREENSHOTS_PATH)) {
  fs.mkdirSync(config.SCREENSHOTS_PATH, {
    recursive: true,
  });
}
if (!fs.existsSync(config.TEMPLATES_PATH)) {
  fs.mkdirSync(config.TEMPLATES_PATH, {
    recursive: true,
  });
}
