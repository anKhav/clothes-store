const jwt = require("jsonwebtoken");
const { Token } = require("../db/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token) {
    try {
      return await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId: userId } });
    if (tokenData) {
      console.log(refreshToken);
      tokenData.token = refreshToken;
      return tokenData.save();
    }
    return await Token.create({ userId: userId, token: refreshToken });
  }

  async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }

  async findToken(refreshToken) {
    return await Token.findOne({ where: { refreshToken } });
  }

  async findAll() {
    return await Token.findAll();
  }
}

module.exports = new TokenService();
