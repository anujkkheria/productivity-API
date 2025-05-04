import { createNewLogger } from "../utils/createNewlogger.js";

export function logger(req, res, next) {
  const url = req.originalUrl;
  const urlSplit = url.split("/");
  const actionSplit = urlSplit.map((item) => (item === "" ? "test" : item));
  const actionType = actionSplit[1];
  const action = actionSplit[2];
  createNewLogger.info(`${actionType}/${action}`);
  next();
}
