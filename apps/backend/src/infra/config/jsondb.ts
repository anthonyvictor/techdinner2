import { Config, JsonDB } from "node-json-db";

const config = new Config("db", true, true, "/");

export const db = new JsonDB(config);
