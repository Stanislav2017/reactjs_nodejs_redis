const Router = require("express").Router;
const router = new Router();
const AuthController = require("../controllers/auth.controller");
const { signupUser, signinUser } = require("../middlewares/user.middleware");
const { checkAuth, refreshAuth } = require("../middlewares/auth.middleware");
const errorMiddleware = require("../middlewares/error.middleware");

router.post("/signin", signinUser, errorMiddleware, AuthController.signin);
router.post("/signup", signupUser, errorMiddleware, AuthController.signup);

router.get("/confirm_email/:link", AuthController.confirmEmail);
router.get("/check_auth", checkAuth, AuthController.checkAuth);
router.get("/refresh_token", refreshAuth, AuthController.refreshToken);

module.exports = router;
