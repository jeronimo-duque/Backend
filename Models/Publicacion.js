const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarioSchema = new Schema(
  {
    mensaje: { type: String, required: true },
    hora: { type: Date, default: Date.now },
    IDUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Nombre: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const publicacionSchema = new Schema(
  {
    IDUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Image: { type: String, required: true },
    Comentarios: [comentarioSchema],
  },
  {
    timestamps: true,
  }
);

const Publicacion = mongoose.model("Publicacion", publicacionSchema);
module.exports = Publicacion;
