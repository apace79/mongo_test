import { MongoClient } from "mongodb";

import type { Config } from "./config";
import type { Logger } from "./logger";
import type { Record } from "./types";

export const create = (config: Config["store"], logger: Logger) => {
  const { url, db: dbName, collection: collName } = config;
  const client = new MongoClient(url);

  const insert = async (recs: Record[]) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const coll = db.collection(collName);
      await coll.insertMany(recs);
    } finally {
      await client.close();
    }
    return;
  };

  const get = async (startDate: Date, endDate: Date): Promise<Record[]> => {
    logger.info({ dbName, collName, startDate, endDate }, "retrieving records");
    let records: Record[] = [];
    try {
      await client.connect();
      const db = client.db(dbName);
      const coll = db.collection(collName);
      records = (await coll
        .find({
          createdAt: { $gte: startDate, $lte: endDate },
        })
        .project({ _id: 0, key: 1, createdAt: 1, value: 1, counts: 1 })
        .toArray()) as Record[];
    } finally {
      await client.close();
    }
    logger.debug({ records }, "extracted records");
    return records;
  };

  const clean = async () => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const coll = db.collection(collName);
      await coll.drop();
    } finally {
      await client.close();
    }
  };

  return {
    insert,
    get,
    clean,
  };
};

export type Store = ReturnType<typeof create>;
