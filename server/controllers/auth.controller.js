const AuthService = require("../services/auth.service");
const { setToken, removeToken } = require("../services/redis.service");

class AuthController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, refreshToken, accessToken } = await AuthService.signup({
        email,
        password,
      });
      setToken({
        userId: user.id,
        token: refreshToken,
        expirein: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, accessToken });
    } catch (e) {
      next(e);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, refreshToken, accessToken } = await AuthService.signin({
        email,
        password,
      });
      setToken({
        userId: user.id,
        token: refreshToken,
        expirein: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, accessToken });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { token: refreshToken, userId } = req.payload;
      await AuthService.logout(refreshToken);
      removeToken({ userId });
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { token } = req.payload;
      const { user, refreshToken, accessToken } = await AuthService.refresh({
        refreshToken: token,
      });
      setToken({
        userId: user.id,
        token: refreshToken,
        expirein: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, accessToken });
    } catch (e) {
      next(e);
    }
  }

  async confirmEmail(req, res, next) {
    try {
      const activationLink = req.params.link;
      await AuthService.confirmEmail({ activationLink });
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
