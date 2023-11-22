const express = require("express");
const router = express.Router();
const { uploadHandler, uploadFileToFirebase } = require("../Config/multer");
const {
  getPublicaciones,
  getPublicacionById,
  getPublicacionesByUserId,
  createPublicacion,
  deletePublicacion,
  updateComentarios,
} = require("../Controllers/ControllerPublicacion");

router.get("/", getPublicaciones);
router.get("/:id", getPublicacionById);
router.get("/user/:userID", getPublicacionesByUserId);
router.post("/", uploadHandler, uploadFileToFirebase, createPublicacion);
router.put("/:id", updateComentarios);
router.delete("/:id", deletePublicacion);

module.exports = router;
