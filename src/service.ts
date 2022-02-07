import { create as createApp } from "./app";

import type { Config } from "./config";
import type { Store } from "./store";
import type { Logger } from "./logger";

export const create = (config: Config["service"], logger: Logger, store: Store) => {
  const run = async () => {
    const app = createApp(logger, store);
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  };

  return {
    run,
  };
};
