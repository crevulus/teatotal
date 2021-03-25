import * as firebase from "firebase";

export function getTeas(app) {
  const db = firebase.firestore(app);
  db.collection("teas")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
}
