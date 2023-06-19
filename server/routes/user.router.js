const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const privateMiddleware = require("../middleware/private.middleware.js");

const router = new Router();

router.get("/", privateMiddleware(), UserController.getAllUsers);
router.post("/", UserController.registration);

module.exports = router;
