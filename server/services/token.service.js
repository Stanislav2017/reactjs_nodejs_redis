const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token.model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return data;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return data;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId, refreshToken });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    await TokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken) {
    const token = await TokenModel.findOne({ refreshToken });
    return token;
  }
}

module.exports = new TokenService();
