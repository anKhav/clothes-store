const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = function () {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next(new ApiError(404, "options"));
    }
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(new ApiError(401, "Unauthorized"));
      }

      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(new ApiError(401, "Unauthorized"));
      }
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      console.log(decoded);
      if (decoded.role !== "ADMIN") {
        return next(new ApiError(403, "No permission"));
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.json(e);
    }
  };
};
