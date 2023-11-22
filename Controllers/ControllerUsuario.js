const User = require("../Models/User");

const getUser = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

const createUser = (req, res) => {
  const ProfilePhoto = req.file.path;
  const Nombre = req.body.Nombre;
  const Descripcion = req.body.Descripcion;
  const Habilidades = req.body.Habilidades;

  const newUser = new User({
    ProfilePhoto,
    Nombre,
    Descripcion,
    Habilidades,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.ProfilePhoto = req.file.path;
      user.Nombre = req.body.Nombre;
      user.Descripcion = req.body.Descripcion;
      user.Habilidades = req.body.Habilidades;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
