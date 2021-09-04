import { useContext, useEffect, useState } from "react";
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

const TEA_TOTAL_STORAGE_FILEPATH = "gs://teatotal-358fc.appspot.com/";

export const useTeasFromFirebase = (): void => {
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
};

export const useImageFromFirebase = (urlString: string): void => {
  const storageRef = firebase.storage(app).ref();
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const trimFilepath = (filepath) => {
    return filepath.replace(TEA_TOTAL_STORAGE_FILEPATH, "");
  };

  const storageChild = trimFilepath(urlString);

  useEffect(() => {
    const getImage = async () => {
      await storageRef
        .child(storageChild)
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => setErrorMsg(error.message));
    };
    getImage();
  });

  return [imageUrl, errorMsg];
};
