import * as firebase from "firebase";
import { useContext, useEffect } from "react";
import AppContext from "./createContext";
import firebaseConfig from "../firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export function useGetTeas() {
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
