const ApiError = require("../errors/api.error");
const TokenService = require("../services/token.service");
const { getToken } = require("../services/redis.service");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnautorizedError());
  }
};

const refreshAuth = async (req, res, next) => {
  try {
    const { userid: userId } = req.headers;
    if (!userId) {
      return next(ApiError.UnautorizedError());
    }
    const token = await getToken({ userId });
    if (!token) {
      return next(ApiError.UnautorizedError());
    }
    const user = TokenService.validateRefreshToken(token);
    if (!user) {
      return next(ApiError.UnautorizedError());
    }
    req.payload = { token, userId };
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
};

module.exports = { auth, refreshAuth };
