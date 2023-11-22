const Publicacion = require("../Models/Publicacion");

// Obtener todas las publicaciones
const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find()
      .populate("IDUsuario")
      .populate({
        path: "Comentarios.IDUsuario", // Especifica el path en el array de subdocumentos
        model: "User", // Especifica el modelo que quieres poblar
      });
    res.json(publicaciones);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const getPublicacionById = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id)
      .populate("IDUsuario")
      .populate({
        path: "Comentarios.IDUsuario",
        model: "User",
      });
    if (!publicacion) res.status(404).json("Publicación no encontrada");
    res.json(publicacion);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const getPublicacionesByUserId = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find({
      IDUsuario: req.params.userID,
    })
      .populate("IDUsuario")
      .populate({
        path: "Comentarios.IDUsuario",
        model: "User",
      });
    res.json(publicaciones);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Crear una nueva publicación
const createPublicacion = async (req, res) => {
  try {
    const { IDUsuario, comentarios } = req.body;
    const nuevaPublicacion = new Publicacion({
      IDUsuario,
      Image: req.file.firebaseUrl,
      Comentarios: comentarios,
    });
    await nuevaPublicacion.save();
    res.json("Publicación creada!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Eliminar una publicación
const deletePublicacion = async (req, res) => {
  try {
    await Publicacion.findByIdAndDelete(req.params.id);
    res.json("Publicación eliminada.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const updateComentarios = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id);
    if (!publicacion) res.status(404).json("Publicación no encontrada");
    const nuevoComentario = {
      mensaje: req.body.mensaje,
      IDUsuario: req.body.IDUsuario,
      Nombre: req.body.Nombre,
    };

    publicacion.Comentarios.push(nuevoComentario);

    await publicacion.save();
    res.json("Comentarios actualizados!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getPublicaciones,
  getPublicacionById,
  createPublicacion,
  deletePublicacion,
  updateComentarios,
  getPublicacionesByUserId,
};
