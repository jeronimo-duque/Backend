const multer = require("multer");
const { format } = require("util");
const admin = require("firebase-admin");
const serviceAccount = require("./mangogram-389f2-firebase-adminsdk-afwdf-fcb81d9845.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mangogram-389f2.appspot.com",
});

const bucket = admin.storage().bucket();

const uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limita el tamaño del archivo a 5MB
  },
}).single("file"); // 'file' es el nombre del campo en tu formulario

const uploadFileToFirebase = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const blob = bucket.file(req.file.originalname);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on("error", (err) => {
    next(err);
  });

  blobWriter.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    req.file.firebaseUrl = publicUrl;
    next();
  });

  blobWriter.end(req.file.buffer);
};

module.exports = { uploadHandler, uploadFileToFirebase };
