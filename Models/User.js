const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    ProfilePhoto: { type: String, required: true },
    Nombre: { type: String, required: true },
    Descripcion: { type: String, required: true },
    Habilidades: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
