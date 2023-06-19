const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/userDto");
const ApiError = require("../error/ApiError");

class UserService {
  async registration(userData) {
    const { email, password, firstName, lastName, role } = userData;
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
      firstName,
      lastName,
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

  async activate(activationLink, next) {
    const user = await User.findOne({ where: { activationLink } });
    console.log(user);
    if (!user) {
      return next(ApiError.badRequest("Uncorrect activation link"));
    }
    user.isActivated = true;
    user.activationLink = null;
    await user.save();
  }
}

module.exports = new UserService();
