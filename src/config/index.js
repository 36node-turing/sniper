import dotenv from "dotenv";

/**
 * init dotenv
 * priority: environment -> .env
 *
 * Available settings
 *
 * APP_PORT=9527
 * APP_BASE_PATH=/v1
 * APP_MONGODB_CONNECTION="mongodb://localhost/petstore"
 */

dotenv.config();

/**
 *
 * @param {string} name envrionment name
 * @param {object} opt option with { required, default }
 * @returns {*} value
 */

export function env(name, init) {
  const value = process.env[name.toUpperCase()] || process.env[name] || init;

  if (value === undefined) {
    throw new Error(`environment ${name} is missing`);
  }

  return value;
}

/**
 * basic
 */
export const NODE_ENV = env("NODE_ENV", "development");
export const PORT = env("PORT", 9527);
export const BASE = env("BASE", "/sniper/v0");
export const LOG_LEVEL = env("LOG_LEVEL", "info");

/**
 * app
 */
export const TEMPLATES_PATH = env(
  "TEMPLATES_PATH",
  `${process.cwd()}/templates`
);
export const SCREENSHOTS_PATH = env(
  "SCREENSHOTS_PATH",
  `${process.cwd()}/screenshots`
);
export const IMAGE_SERVER_PREFIX = env(
  "IMAGE_SERVER_PREFIX",
  "http://turing-citymanagement.36node.com/screenshots/"
);
