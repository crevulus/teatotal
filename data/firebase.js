import * as firebase from "firebase";

import { teaStore } from "./store";

export function getTeas(app) {
  const db = firebase.firestore(app);
  const teas = [];
  db.collection("teas")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        teas.push({ id: doc.id, data: doc.data() });
      });
    });
  teaStore.setTeas(teas);
}
