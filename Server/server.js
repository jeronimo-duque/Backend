const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../Config/config");

class Server {
  constructor() {
    this.app = express();
    this.port = config.PORT; // Usar puerto desde configuración
    this.server = require("http").createServer(this.app);

    this.paths = {
      auth: "/api/auth",
      publicaciones: "/api/publicaciones",
      comentarios: "/api/comentarios",
      chats: "/api/chats",
      mensajes: "/api/mensajes",
      usuario: "/api/usuarios",
    };

    this.connectToDB();
    this.addMiddlewares();
    this.setRoutes();
  }

  async connectToDB() {
    try {
      await mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conexión exitosa a MongoDB");
    } catch (error) {
      console.error("Error al conectar a MongoDB", error);
      process.exit(1); // Detener la aplicación en caso de error
    }
  }

  addMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
  }

  setRoutes() {
    this.app.use(this.paths.usuario, require("../Routes/RouterUsuario"));
    /* Aquí asumo que tienes los archivos de ruta adecuados en '../Routes'
    
    this.app.use(this.paths.auth, require("../Routes/auth"));
    this.app.use(this.paths.publicaciones, require("../Routes/publicaciones"));
    this.app.use(this.paths.chats, require("../Routes/chat"));
    this.app.use(this.paths.mensajes, require("../Routes/mensajes"));
    this.app.use(this.paths.usuario, require("../Routes/usuarios"));
    */
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = { Server };
