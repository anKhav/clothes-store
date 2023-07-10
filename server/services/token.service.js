const jwt = require("jsonwebtoken");
const { Token } = require("../db/models");

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "10s",
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

  async validateRefreshToken(token) {
    try {
      return await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return new Error(e.message);
    }
  }

  async saveToken(user_id, refreshToken) {
    console.log(user_id);
    const tokenData = await Token.findOne({ where: { user_id } });
    console.log(tokenData);
    if (tokenData) {
      tokenData.token = refreshToken;
      return tokenData.save();
    }
    return await Token.create({ user_id, token: refreshToken });
  }

  async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } });
  }

  async findToken(refreshToken) {
    return await Token.findOne({where: {token: refreshToken}})
  }

  async findAll() {
    return await Token.findAll();
  }
}

module.exports = new TokenService();
