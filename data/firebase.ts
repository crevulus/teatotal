import { useContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../firebaseConfig";

import AppContext from "./createContext";

export const firebaseApp = initializeApp(firebaseConfig);

export type TeaType = {
  url: string;
  rating: number;
  strength: number;
  name: string;
  logo: string;
  id: string;
};

const TEA_TOTAL_STORAGE_FILEPATH = "gs://teatotal-358fc.appspot.com/";

export const useBlackTeasFromFirebase = (): void => {
  const db = getFirestore();
  const { blackTeas, setBlackTeas } = useContext(AppContext);

  useEffect(() => {
    const getTeas = async () => {
      if (blackTeas.length === 0) {
        const teaData = [];
        const querySnapshot = await getDocs(collection(db, "blackTeas"));
        querySnapshot.forEach((doc) => {
          teaData.push({ id: doc.id, data: doc.data() });
        });
        setBlackTeas(teaData);
      }
    };
    getTeas();
  }, []);
};

export const useImageFromFirebase = (urlString: string): void => {
  const storage = getStorage();
  const [imageUrl, setImageUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const trimFilepath = (filepath) => {
    return filepath.replace(TEA_TOTAL_STORAGE_FILEPATH, "");
  };

  const storageRef = ref(storage, trimFilepath(urlString));

  useEffect(() => {
    const getImage = async () => {
      await getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => setErrorMsg(error.message));
    };
    getImage();
  }, []);

  return [imageUrl, errorMsg];
};
