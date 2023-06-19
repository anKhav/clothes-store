const ApiError = require("../error/ApiError");
const tokenService = require("../services/token.service");

module.exports = async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const userData = await tokenService.validateAccessToken(accessToken);
    console.log(userData);

    if (!userData) {
      return next(new ApiError(401, "Unauthorized"));
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(new ApiError(401, "Unauthorized"));
  }
};
