const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
  console.log("Aca puede generar error");
  return new Promise((resolve, reject) => {
    const payload = { uid: uid, name: name };

    jwt.sign(
      payload,
      "12390128i39klasdjklasdjaskld90123901238i9",
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = generarJWT;
