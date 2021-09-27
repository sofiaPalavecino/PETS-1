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

function getUserAttriute(uid: any, attribute: any): Promise<any> {
  return new Promise((res: any) => {
    return db
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((usuario: any) => {
          res(usuario.data()[`${attribute}`]);
        });
      });
  });
}

function getCantDocs(docID: any, col1: any, col2: any): Promise<number> {
  return new Promise((res: any) => {
    return db
      .collection(col1)
      .doc(docID)
      .collection(col2)
      .get()
      .then((docs: any) => {
        res(docs.size);
      });
  });
}

//-----------------------------------------------------------

app.get("/api/mascotasPorBarrio/:barrio", function (req: any, res: any) {
  const barrio = req.params.barrio;
  db.collection("users")
    .where("barrio", "==", barrio)
    .get()
    .then((querySnapshot: any) => {
      let tipos = new Map();
      let promises = [];
      let users: any = querySnapshot.docs;

      for (const user of users) {
        var paux = new Promise((resolve, reject) => {
          db.collection("users")
            .doc(user.id)
            .collection("mascota")
            .get()
            .then((querySnapshot: any) => {
              let mascotas: any = querySnapshot.docs;

              for (const mascota of mascotas) {
                if (tipos.has(mascota.data()["especie"])) {
                  tipos.set(
                    mascota.data()["especie"],
                    tipos.get(mascota.data()["especie"]) + 1
                  );
                } else {
                  tipos.set(mascota.data()["especie"], 1);
                }
              }

              resolve(true);
            });
        });

        promises.push(paux);
      }

      Promise.all(promises).then((result) => {
        res.send(Object.fromEntries(tipos));
      });
    });
});

app.get("/api/paseadores", function (req: any, res: any) {
  db.collection("paseador")
    .get()
    .then((querySnapshot: any) => {
      let paseadores = new Map();
      let promises = [];
      let docs: any = querySnapshot.docs;

      for (const paseador of docs) {
        var paux = new Promise((resolve, reject) => {
          getUserAttriute(paseador.id, "nombre").then((nombreUsuario) => {
            paseadores.set(
              nombreUsuario + " (uid: " + paseador.id + " )",
              paseador.data()["calificacion_promedio"]
            );
            resolve(true);
          });
        });
        promises.push(paux);
      }

      Promise.all(promises).then((result) => {
        res.send(Object.fromEntries(paseadores));
      });
    });
});

app.get("/api/casasConMascotas", function (req: any, res: any) {
  db.collection("users")
    .get()
    .then((querySnapshot: any) => {
      let barrios = new Map();
      let promises = [];
      let usuarios: any = querySnapshot.docs;

      for (const user of usuarios) {
        var paux = new Promise((resolve, reject) => {
          if (user.data()["barrio"] != undefined && user.data()["barrio"] != null) {
            getCantDocs(user.id, "users", "mascota").then((cantMascotas) => {
              if (barrios.has(user.data()["barrio"])) {
                barrios.set(
                  user.data()["barrio"],
                  barrios.get(user.data()["barrio"]) + cantMascotas
                );
              } else {
                barrios.set(user.data()["barrio"], cantMascotas);
              }
              resolve(true);
            });
          }
        });
        promises.push(paux);
      }
      
      Promise.all(promises).then((result) => {
        res.send(Object.fromEntries(barrios));
      });
    });
});

app.get("/api/organizacionesMasTransitadas", function (req: any, res: any) {
  db.collection("organización")
    .get()
    .then((querySnapshot: any) => {
      let organizaciones = new Map();
      let promises = [];
      let docs: any = querySnapshot.docs;

      for (const organizacion of docs) {
        var paux = new Promise((resolve, reject) => {
          getCantDocs(organizacion.id, "organización", "publicaciones").then(
            (cantPublicaciones) => {
              let dataOrga = new Map();
              dataOrga.set("calificacion", organizacion.data()["calificacion"]);
              dataOrga.set("publicaciones", cantPublicaciones);
              organizaciones.set(
                organizacion.data()["nombre"],
                Object.fromEntries(dataOrga)
              );
              resolve(true);
            }
          );
        });
        promises.push(paux);
      }

      Promise.all(promises).then((result) => {
        res.send(Object.fromEntries(organizaciones));
      });
    });
});

app.get(
  "/api/serviciosPorBarrio/:servicio",
  async function (req: any, res: any) {
    const servicio = req.params.servicio;
    db.collection("contrato" + servicio)
      .get()
      .then((querySnapshot: any) => {
        let barrios = new Map();
        let promises = [];
        let contratos: any = querySnapshot.docs;

        for (const contrato of contratos) {
          var paux = new Promise((resolve, reject) => {
            getUserAttriute(contrato.data()["idCliente"], "barrio").then(
              (barrio: any) => {
                if (barrios.has(barrio)) {
                  barrios.set(barrio, barrios.get(barrio) + 1);
                } else {
                  barrios.set(barrio, 1);
                }
                resolve(true);
              }
            );
          });
          promises.push(paux);
        }

        Promise.all(promises).then((result) => {
          res.send(Object.fromEntries(barrios));
        });
      });
  }
);

//server.listen(port);
