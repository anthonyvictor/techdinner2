import { NextFunction, Request, Response } from "express";

export const isFrom = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["API-Key"];
  const from =
    apiKey === process.env.USER_SECRET_KEY
      ? "user"
      : apiKey === process.env.CUSTOMER_SECRET_KEY
        ? "customer"
        : undefined;
  if (from) {
    req.headers.from = from;
    next();
  }
};

export const getIsFrom = (req: Request) => {
  return req.headers.from as "user" | "customer";
};
