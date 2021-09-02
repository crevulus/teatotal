import { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import firebaseConfig from "../firebaseConfig";

import AppContext from "./createContext";

const app = firebase.initializeApp(firebaseConfig);

export type TeaType = {
  url: string;
  rating: number;
  strength: number;
  name: string;
  logo: string;
  id: string;
};

export function useGetTeasFromFirebase(): void {
  const db = firebase.firestore(app);
  const { teas, setTeas } = useContext(AppContext);

  useEffect(() => {
    const getTeas = async () => {
      if (teas.length === 0) {
        const teaData = [];
        await db
          .collection("teas")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              teaData.push({ id: doc.id, data: doc.data() });
            });
          });
        setTeas(teaData);
      }
    };
    getTeas();
  }, []);
}
