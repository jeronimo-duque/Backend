const express = require("express");
const router = express.Router();

const Upload = require("../Config/multer");

const {
  getUser,
  getUserById,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
} = require("../Controllers/ControllerUsuario");

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.post("/register", Upload.single("ProfilePhoto"), registerUser);
router.delete("/id", deleteUser);
router.put("/:id", Upload.single("ProfilePhoto"), updateUser);

module.exports = router;
