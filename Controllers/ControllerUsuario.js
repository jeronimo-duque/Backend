const User = require("../Models/User");
const generarJWT = require("../Helpers/jwt");

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }

    // Validar la contraseña
    if (!user.validatePassword(password)) {
      return res.status(400).json("Contraseña incorrecta");
    }

    // Generar JWT
    const token = await generarJWT(user.id, user.email);

    res.json({
      uid: user.id,
      name: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err });
  }
};

// Registrar usuario
const registerUser = async (req, res) => {
  try {
    const { email, password, Nombre, Descripcion, Habilidades } = req.body;
    const existingUser = await User.findOne({
      Email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      // Manejar el caso en que el usuario ya existe, por ejemplo:
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado." });
    }
    const user = new User({
      ProfilePhoto: req.file.path,
      Email: email,
      Nombre,
      Descripcion,
      Habilidades,
    });
    // Configurar la contraseña
    user.setPassword(password);

    await user.save();

    // Generar JWT
    const token = await generarJWT(user.id, user.email);

    res.status(201).json({
      uid: user.id,
      name: user.email,
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: err });
  }
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
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
};
