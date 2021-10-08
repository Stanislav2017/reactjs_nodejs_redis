const UserModel = require("../models/user.model");
const UserDto = require("../dto/user.dto");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const MailService = require("./mail.service");
const TokenService = require("./token.service");
const ApiError = require("../errors/api.error");

class AuthService {
  async signin(data) {
    const { email, password } = data;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} not found!`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Incorrect email or password!`);
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async signup(data) {
    const { email, password } = data;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} is already exist`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await MailService.sendConfirmationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async confirmEmail(data) {
    const { activationLink } = data;
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("The activation link is incorrect!");
    }
    user.isEmailConfirmed = true;
    await user.save();
  }

  async refresh(data) {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnautorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(data) {
    const { refreshToken } = data;
    await TokenService.refreshToken(refreshToken);
  }
}

module.exports = new AuthService();
