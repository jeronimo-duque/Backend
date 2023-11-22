const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    ProfilePhoto: { type: String, required: true },
    Nombre: { type: String, required: true },
    Descripcion: { type: String, required: true },
    Habilidades: { type: String, required: true },
    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // Agregado campo Email
    passwordHash: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.passwordHash = bcrypt.hashSync(password, salt);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
