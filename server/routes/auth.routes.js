const Router = require("express").Router;
const router = new Router();
const AuthController = require("../controllers/auth.controller");
const { signupUser, signinUser } = require("../middlewares/user.middleware");
const { refreshAuth } = require("../middlewares/auth.middleware");
const errorMiddleware = require("../middlewares/error.middleware");

router.post("/signin", signinUser, errorMiddleware, AuthController.signin);
router.post("/signup", signupUser, errorMiddleware, AuthController.signup);

router.get("/confirm_email/:link", AuthController.confirmEmail);
router.get("/refresh_token", refreshAuth, AuthController.refreshToken);
router.post("/logout", refreshAuth, AuthController.logout);

module.exports = router;
