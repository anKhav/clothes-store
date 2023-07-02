const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
};

module.exports = errorHandler;
