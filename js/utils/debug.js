import { DEBUG } from "../config/app.config.js";

export const debug = {
  log: (...args) => DEBUG && console.log(...args),
  warn: (...args) => DEBUG && console.warn(...args),
  error: (...args) => DEBUG && console.error(...args),
};
