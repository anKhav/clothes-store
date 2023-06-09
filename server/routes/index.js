const { Router } = require("express");

const router = new Router();
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const sizeRouter = require("./size.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const ratingRouter = require("./rating.router");

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/size", sizeRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/rating", ratingRouter);

module.exports = router;
