const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

exports.app = functions.https.onRequest(app);

var serviceAccount = require("../src/conf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com",
});
const db = admin.firestore();

app.get("/hello-world", (req: any, res: any) => {
  return res.status(200).send("Hello World!");
});

async function getNombreUsuario(uid: any) {
  return await db
    .collection("users")
    .where("uid", "==", uid)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((usuario: any) => {
        return usuario.data()["Nombre"];
      });
    });
}

async function getBarrio(uid: any) {
  return await db
    .collection("users")
    .where("uid", "==", uid)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((usuario: any) => {
        return usuario.data()["barrio"];
      });
    });
}

async function getCantDocs(docID: any, col1: any, col2: any) {
  return await db
    .collection(col1)
    .doc(docID)
    .collection(col2)
    .get()
    .then((docs: any) => {
      return docs.size;
    });
}

//-----------------------------------------------------------


app.get("/api/mascotasPorBarrio/:barrio", async function (req: any, res: any) {
  const barrio = req.params.barrio;
  await db
    .collection("users")
    .where("barrio", "==", barrio)
    .get()
    .then((querySnapshot: any) => {
      const tipos = new Map();
      querySnapshot.forEach((usuario: any) => {
        db.collection("users")
          .doc(usuario.id)
          .collection("mascota")
          .get()
          .then((mascotas: any) => {
            mascotas.forEach((mascota: any) => {
              if (tipos.has(mascota.data()["especie"])) {
                tipos.set(
                  mascota.data()["especie"],
                  tipos.get(mascota.data()["especie"]) + 1
                );
              } else {
                tipos.set(mascota.data()["especie"], 1);
              }
            });
          });
      });
      res.send(Object.fromEntries(tipos));
    });
});


app.get("/api/paseadores", async function (req: any, res: any) {
  db.collection("paseador")
    .get()
    .then((querySnapshot: any) => {
      let paseadores = new Map();
      querySnapshot.forEach(async (pasedor: any) => {
        let nombreUsuario = await getNombreUsuario(pasedor.data()["idUsuario"]);
        paseadores.set(
          nombreUsuario + pasedor.data()["idUsuario"],
          pasedor.data()["calificacion promedio"]
        );
      });
      res.send(Object.fromEntries(paseadores));
    });
});


app.get("/api/casasConMascotas", async function (req: any, res: any) {
  return await db
    .collection("users")
    .get()
    .then((querySnapshot: any) => {
      let barrios = new Map();
      querySnapshot.forEach(async (user: any) => {
        let cantMascotas = await getCantDocs(user.id, "users", "mascota");
        if (barrios.has(user.data()["barrio"])) {
          barrios.set(
            user.data()["barrio"],
            barrios.get(user.data()["barrio"]) + cantMascotas
          );
        } else {
          barrios.set(user.data()["barrio"], cantMascotas);
        }
      });
      console.log(barrios);
      res.send(Object.fromEntries(barrios));
    });
});


app.get(
  "/api/organizacionesMasTrancitadas",
  async function (req: any, res: any) {
    await db
      .collection("organización")
      .get()
      .then((querySnapshot: any) => {
        let organizaciones = new Map();
        querySnapshot.forEach(async (organizacion: any) => {
          let dataOrga = [];
          let cantPublicaciones = await getCantDocs(
            organizacion.id,
            "organización",
            "publicaciones"
          );
          dataOrga.push(organizacion.data()["calificacion"]);
          dataOrga.push(cantPublicaciones);

          organizaciones.set(organizacion.data()["nombre"], dataOrga);
        });
        res.send(Object.fromEntries(organizaciones));
      });
  }
);


app.get(
  "/api/serviciosPorBarrio/:servicio",
  async function (req: any, res: any) {
    const servicio = req.params.servicio;
    db.collection("contrato " + servicio)
      .get()
      .then((contratos: any) => {
        let barrios    = new Map();
        contratos.forEach(async (contrato: any) => {
          let barrio = await getBarrio(contrato.data()["idCliente"]);
          if (barrios.has(barrio)) {
            barrios.set(barrio, barrios.get(barrio) + 1);
          } else {
            barrios.set(barrio, 1);
          }
        });
        res.send(Object.fromEntries(barrios));
      });
  }
);

//server.listen(port);
