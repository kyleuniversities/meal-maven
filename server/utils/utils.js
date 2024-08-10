function throwError(req, res, error, status = 500) {
  return res.status(status).json({
    class: "ApiError",
    message: error.message,
    status,
    time: new Date().toISOString(),
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });
}

module.exports = { throwError };
