const express = require("express");
const router = express.Router();

const {
  getChats,
  getChatById,
  createChat,
  addMensaje,
  deleteChat,
} = require("../Controllers/ControllerChats");

router.get("/:userId", getChats);
router.get("/chat/:id", getChatById);
router.post("/", createChat);
router.post("/mensajes/:id", addMensaje);
router.delete("/:id", deleteChat);

module.exports = router;
