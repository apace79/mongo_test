import supertest = require("supertest");
import sinon = require("sinon");

import { createLogger, createStore } from "../fixtures";
import { create as createApp } from "../../src/app";

describe("/get_data", () => {
  beforeEach(sinon.restore);

  test("200", async () => {
    const logger = createLogger();
    const store = createStore();
    store.get.resolves([
      {
        key: "foo",
        createdAt: new Date("2021-01-01T00:00:00.000Z"),
        counts: [1, 2],
      },
      {
        key: "bar",
        createdAt: new Date("2021-12-31T00:00:00.000Z"),
        counts: [3, 4],
      },
    ]);
    const app = createApp(logger as any, store);
    const request = {
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      minCount: 0,
      maxCount: 4,
    };
    const response = await supertest(app).post("/get_data").send(request);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      code: 0,
      msg: "Success",
      records: [
        {
          key: "foo",
          createdAt: "2021-01-01T00:00:00.000Z",
          totalCount: 3,
        },
      ],
    });
    expect(store.get.args[0]).toEqual([
      new Date("2021-01-01T00:00:00.000Z"),
      new Date("2021-12-31T00:00:00.000Z"),
    ]);
  });

  test("400", async () => {
    const logger = createLogger();
    const store = createStore();
    const app = createApp(logger as any, store);
    const response = await supertest(app).post("/get_data").send({
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      minCount: 0,
      maxCoun: 4,
    });
    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      code: 400,
    });
  });

  test("500", async () => {
    const logger = createLogger();
    const store = createStore();
    store.get.rejects({ msg: "error" });
    const app = createApp(logger as any, store);
    const response = await supertest(app).post("/get_data").send({
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      minCount: 0,
      maxCount: 4,
    });
    expect(response.status).toEqual(500);
    expect(response.body).toEqual({
      code: 500,
      msg: "Internal server error",
    });
  });
});
