import * as firebase from "firebase";
import React, { useContext, useEffect } from "react";
import AppContext from "./createContext";

export function useGetTeas(app) {
  const db = firebase.firestore(app);
  const { teas, setTeas } = useContext(AppContext);
  const teaData = [];

  useEffect(() => {
    db.collection("teas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          teaData.push({ id: doc.id, data: doc.data() });
        });
      });
    setTeas(teaData);
  }, []);

  return;
}
