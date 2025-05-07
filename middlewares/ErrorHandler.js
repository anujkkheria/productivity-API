export const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Internal server error ";
  return res.status(err.statusCode).send({
    message: err.message,
  });
};
