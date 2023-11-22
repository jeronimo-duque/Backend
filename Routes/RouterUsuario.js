const express = require("express");
const router = express.Router();

const Upload = require("../Config/multer");

const {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require("../Controllers/ControllerUsuario");

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", Upload.single("ProfilePhoto"), createUser);
router.delete("/id", deleteUser);
router.put("/:id", Upload.single("ProfilePhoto"), updateUser);

module.exports = router;
