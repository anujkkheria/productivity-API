import { log } from "winston";

const httpErrors = {
  401: "Unauthorized Access",
  403: "Unauthorized Access",
  500: "Internal server error"
}

export const ErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  return res.status(err.statusCode).send({
    message: httpErrors[statusCode],
  });
};
