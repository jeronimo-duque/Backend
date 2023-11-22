const express = require("express");
const router = express.Router();

const { uploadHandler, uploadFileToFirebase } = require("../Config/multer");

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
router.post("/register", uploadHandler, uploadFileToFirebase, registerUser);
router.delete("/id", deleteUser);
router.put("/:id", uploadHandler, uploadFileToFirebase, updateUser);

module.exports = router;
