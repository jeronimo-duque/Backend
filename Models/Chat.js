const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    participantes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    mensajes: [
      {
        texto: { type: String, required: true },
        enviadoPor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
