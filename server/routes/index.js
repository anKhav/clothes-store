const { Router } = require("express");

const router = new Router();
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");

router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
