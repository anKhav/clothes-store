const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const privateMiddleware = require("../middleware/private.middleware.js");

const router = new Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.registration);
router.get("/refresh", UserController.refresh);

module.exports = router;
