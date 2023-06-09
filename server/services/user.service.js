const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/userDto");
const ApiError = require("../error/ApiError");
const tokenService = require("../services/token.service.js");

class UserService {
  async registration(userData) {
    const { email, password, first_name, last_name, role } = userData;
    if (!email || !password) {
      return new ApiError(404, "No valid values");
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return new ApiError(401, "User already exist");
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      password: hashPassword,
      first_name,
      last_name,
      role,
    });

    const userDto = new UserDto(user);
    return { ...userDto };
  }

  async getUser(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user.dataValues;
    } catch (e) {
      return new Error("No found");
    }
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async deleteUser(id) {
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return user;
    }
  }

  async updateUserPersonalInformation(info) {
    const user = await User.findOne({ where: { id: info.id } });
    user.firstName = info.firstName;
    user.lastName = info.lastName;
    user.address = info.address;
    if (info.image) {
      user.image = info.image;
    }
    await user.save();
    return user;
  }

  async updateUserSecurityInformation(info) {
    console.log(info);
    const user = await User.findOne({ where: { id: info.id } });
    const hashPassword = await bcrypt.hash(info.password, 5);
    user.email = info.email;
    user.password = hashPassword;
    user.isActivated = info.isActivated;
    if (user.isActivated) {
      user.activationLink = null;
    }
    await user.save();
    return user;
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    console.log(user);
    if (!user) {
      return new ApiError("Uncorrect activation link");
    }
    user.isActivated = true;
    user.activationLink = null;
    await user.save();
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      console.log('error')
      return new ApiError("Unauthorized");
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenModel = await tokenService.findToken(refreshToken);
    const tokenFromDb = tokenModel.dataValues.token;
    if (!userData || !tokenFromDb) {
      return new ApiError("Unauthorized");
    }
    const user = await User.findOne({ where: { email: userData.email } });
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user };

  }
}

module.exports = new UserService();
