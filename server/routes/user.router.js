const { Router } = require("express");
const UserController = require("../controllers/user.controller");
// const privateMiddleware = require("../middleware/private.middleware.js");
const {userValidationRules, validate} = require('../middleware/validation.middleware')

const router = new Router();

router.get("/", UserController.getAllUsers);
router.post("/",userValidationRules(),validate, UserController.registration);
router.get("/refresh", UserController.refresh);

module.exports = router;
