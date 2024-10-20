const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getSingleUser,
} = require("../controllers/userController");


const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/:id").get(getSingleUser);

module.exports = router;
