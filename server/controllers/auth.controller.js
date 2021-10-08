const AuthService = require("../services/auth.service");
const { setToken } = require("../services/redis.service");

class AuthController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.signup({ email, password });
      setToken({
        userId: userData.user.id,
        token: userData.accessToken,
        expirein: 15 * 60,
      });
      setToken({
        userId: userData.user.id,
        token: userData.refreshToken,
        type: "refresh.token",
        expirein: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.signin({ email, password });
      setToken({
        userId: userData.user.id,
        token: userData.accessToken,
        expirein: 15 * 60,
      });
      setToken({
        userId: userData.user.id,
        token: userData.refreshToken,
        type: "refresh.token",
        expirein: 30 * 24 * 60 * 60 * 1000,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const cookies = req.cookies;
      await UserService.logout(refreshToken);
      Object.keys(cookies).map((v) => res.clearCookie(v));
      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { token: refreshToken } = req.payload;
      const userData = await AuthService.refresh({ refreshToken });
      setToken({
        userId: userData.user.id,
        token: userData.accessToken,
        expirein: 15 * 60,
      });
      setToken({
        userId: userData.user.id,
        token: userData.refreshToken,
        type: "refresh.token",
        expirein: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
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

  checkAuth(req, res, next) {
    const { token, user } = req.payload;
    return res.json({ user, accessToken: token });
  }
}

module.exports = new AuthController();
