import { v4 as uuidv4 } from "uuid";

import { create as createStore } from "../../src/store";
import { createLogger } from "../fixtures";

describe("store", () => {
  const config = {
    url: "mongodb://root:example@localhost:27017",
    db: uuidv4(),
    collection: uuidv4(),
  };
  const logger = createLogger();
  const store = createStore(config, logger as any);

  afterEach(async () => {
    await store.clean();
  });

  test("get", async () => {
    const recordsIn = [
      {
        key: "AkcKkrLs",
        value: "qnfSodsuvVzc",
        createdAt: new Date("2015-03-08T07:29:46.532Z"),
        counts: [1964, 1870, 1011],
      },
      {
        key: "BqOIkrTF",
        createdAt: new Date("2015-06-03T01:01:52.237Z"),
        counts: [1401, 1950, 1283],
        value: "vHpHAzrmkwtt",
      },
      {
        key: "rpIRzoMs",
        value: "gSmvTJCnSgrL",
        createdAt: new Date("2016-04-26T10:58:48.978Z"),
        counts: [383, 16, 1000],
      },
    ];
    await store.insert(recordsIn);

    const startDate = new Date("2015-01-01T00:00:00.000Z");
    const endDate = new Date("2015-12-31T00:00:00.000Z");
    const result = await store.get(startDate, endDate);
    expect(result).toEqual([
      {
        key: "AkcKkrLs",
        value: "qnfSodsuvVzc",
        createdAt: new Date("2015-03-08T07:29:46.532Z"),
        counts: [1964, 1870, 1011],
      },
      {
        key: "BqOIkrTF",
        createdAt: new Date("2015-06-03T01:01:52.237Z"),
        counts: [1401, 1950, 1283],
        value: "vHpHAzrmkwtt",
      },
    ]);
  });
});
