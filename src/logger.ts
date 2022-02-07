import pino from "pino";

import type { Config } from "./config";

export const create = (config: Config["logger"]) => {
  return pino(config);
};

export type Logger = ReturnType<typeof create>;
