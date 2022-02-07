import { config } from "./config";
import { create as createLogger } from "./logger";
import { create as createStore } from "./store";
import { create as createService } from "./service";

const logger = createLogger(config.logger);
const store = createStore(config.store, logger);
const service = createService(config.service, logger, store);
service.run();
