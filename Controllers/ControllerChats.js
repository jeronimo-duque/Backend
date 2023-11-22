const Chat = require("../Models/Chat");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Obtener todos los chats en los que un usuario es participante
const getChats = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    const chats = await Chat.find({
      participantes: userId,
    }).populate("participantes");

    res.json(chats);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Obtener un chat por ID
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate("participantes")
      .populate({
        path: "mensajes.enviadoPor",
        select: "Nombre",
      });
    if (!chat) {
      return res.status(404).json("Chat no encontrado");
    }
    res.json(chat);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Crear un nuevo chat
const createChat = async (req, res) => {
  try {
    const nuevoMensaje = {
      texto: req.body.texto,
      enviadoPor: req.body.enviadoPor,
    };
    const nuevoChat = new Chat({
      participantes: req.body.participantes,
      mensajes: [],
    });

    nuevoChat.mensajes.push(nuevoMensaje);

    await nuevoChat.save();
    res.json("Chat creado con éxito!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Añadir un mensaje al chat
const addMensaje = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json("Chat no encontrado");
    }
    const nuevoMensaje = {
      texto: req.body.texto,
      enviadoPor: req.body.enviadoPor,
    };
    chat.mensajes.push(nuevoMensaje);
    await chat.save();
    res.json("Mensaje añadido al chat!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Eliminar un chat
const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndRemove(req.params.id);
    res.json("Chat eliminado con éxito");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = {
  getChats,
  getChatById,
  createChat,
  addMensaje,
  deleteChat,
};
