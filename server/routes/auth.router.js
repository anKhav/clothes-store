const { Router } = require("express");
const userController = require("../controllers/user.controller");
const TokenService = require("../services/token.service.js");
const authMiddleware = require("../middleware/authorization.middleware.js");

const router = new Router();

router.post("/login", userController.login);
router.get("/tokens", authMiddleware, async (req, res) => {
  const data = await TokenService.findAll();
  res.json(data);
});

module.exports = router;
