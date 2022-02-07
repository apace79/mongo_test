import express from "express";
import Joi from "joi";

import type { Logger } from "pino";
import type { Store } from "./store";
import type { Record } from "./types";

export const create = (logger: Logger, store: Store) => {
  const app = express();

  // body parser
  app.use(express.json());

  // generic logs
  app.use((req, res, next) => {
    logger.info(req);
    next();
  });

  // route

  // route schemas
  const schema = Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    minCount: Joi.number().integer(),
    maxCount: Joi.number().integer(),
  }).options({ presence: "required" });

  interface RequestBody {
    startDate: string;
    endDate: string;
    minCount: number;
    maxCount: number;
  }

  interface ResponseBodyRecords {
    key: string;
    createdAt: string;
    totalCount: number;
  }

  interface ResponseBody {
    code: 0 | 400 | 500;
    msg: string;
    records: ResponseBodyRecords[];
  }

  const recordsToResponse = (
    records: Record[],
    min: number,
    max: number
  ): ResponseBodyRecords[] => {
    const outRecords: ResponseBodyRecords[] = [];
    for (const record of records) {
      const totalCount = record.counts.reduce((a, b) => a + b, 0);
      if (min < totalCount && totalCount < max) {
        outRecords.push({
          key: record.key,
          createdAt: record.createdAt.toISOString(),
          totalCount,
        });
      }
    }
    return outRecords;
  };

  // route handler
  app.post("/get_data", async (req, res) => {
    logger.info({ body: req.body }, "POST /get_data request");

    // validation
    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send({
        code: 400,
        msg: result.error,
      });
      return;
    }

    try {
      const {
        startDate: startDateStr,
        endDate: endDateStr,
        minCount,
        maxCount,
      }: RequestBody = req.body;
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      const records = await store.get(startDate, endDate);
      const response: ResponseBody = {
        code: 0,
        msg: "Success",
        records: recordsToResponse(records, minCount, maxCount),
      };
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: 500,
        msg: "Internal server error",
      });
    }
  });

  return app;
};

export type App = ReturnType<typeof create>;
