const HTTP_PORT = process.env.HTTP_PORT ?? "8080";
const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
const MONGODB_URL = process.env.MONGODB_URL ?? "mongodb://root:example@mongo:27017";
const STORE_DB_NAME = process.env.STORE_DB_NAME ?? "test";
const STORE_COLLECTION_NAME = process.env.STORE_COLLECTION_NAME ?? "records";

export const config = {
  service: {
    port: HTTP_PORT,
  },
  logger: {
    level: LOG_LEVEL,
  },
  store: {
    url: MONGODB_URL,
    db: STORE_DB_NAME,
    collection: STORE_COLLECTION_NAME,
  },
} as const;

export type Config = typeof config;
