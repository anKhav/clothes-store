const userService = require("../services/user.service.js");
const TokenService = require("../services/token.service");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, firstName, lastName, role } = req.body;
      const userData = await userService.registration({
        email,
        password,
        firstName,
        lastName,
        role,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      return next(new ApiError(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUser(email);
      if (!user) {
        return next(new ApiError(401, "Email is incorrect"));
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      let tokens = TokenService.generateTokens({
        email: user.email,
        role: user.role,
      });
      await TokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
      });
      res.json(tokens);
    } catch (e) {
      return next(new ApiError(e.status, e.message));
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      return next(new ApiError(500, e.message));
    }
  }
}

module.exports = new UserController();
