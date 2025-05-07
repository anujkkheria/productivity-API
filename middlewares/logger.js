import { createNewLogger } from "../utils/createNewlogger.js";

function createLoggerbyType(type, route, action, data, statusCode) {
  switch (type) {
    case "warn": {
      createNewLogger.warn(
        `${route}/${action} - Response: ${JSON.stringify(
          data
        )} - Status: ${statusCode}`
      );
      break;
    }
    case "error": {
      createNewLogger.error(
        `${route}/${action} - Response: ${JSON.stringify(
          data
        )} - Status: ${statusCode}`
      );
      break;
    }
    default: {
      createNewLogger.info(
        `${route}/${action} - Response: ${JSON.stringify(
          data
        )} - Status: ${statusCode}`
      );
    }
  }
}

export function logger(req, res, next) {
  const url = req.originalUrl;
  const urlSplit = url.split("/");
  const actionSplit = urlSplit.map((item) => (item === "" ? "test" : item));
  const actionType = actionSplit[1];
  const action = actionSplit[2];

  const originalSend = res.send;
  const originalStatus = res.status;

  let statusCode = 200;
  let isLogged = false; // Flag to prevent double logging

  res.status = function (code) {
    statusCode = code;
    return originalStatus.apply(res, arguments);
  };

  res.send = function (data) {
    if (!isLogged) {
      if (statusCode >= 500) {
        createLoggerbyType("error", actionType, action, data, statusCode);
      } else if (statusCode >= 400) {
        createLoggerbyType("warn", actionType, action, data, statusCode);
      } else {
        createLoggerbyType("info", actionType, action, data, statusCode);
      }
      isLogged = true;
    }

    return originalSend.apply(res, arguments);
  };

  createNewLogger.info(
    `${actionType}/${action} - Request: ${req.method} ${url}`
  );

  next();
}
