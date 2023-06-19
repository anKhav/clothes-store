const errorHandler = (err, req, res) => {
  return res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = errorHandler;
