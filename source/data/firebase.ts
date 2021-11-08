import { useContext, useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import firebaseConfig from "../firebaseConfig";

import { useContentContext } from "../store/createContext.ts";
import { ContentActions } from "../store/ContentContext";
import AppContext from "../store/createContext";

export const firebaseApp = initializeApp(firebaseConfig);

const functions = getFunctions(firebaseApp);
connectFunctionsEmulator(functions, "localhost", 5001);

export type TeaType = {
  url: string;
  rating: number;
  strength: number;
  name: string;
  logo: string;
  id: string;
  roundedMinutes?: number;
};

export type TeaLeavesType = {
  [key: string]: unknown;
};

const TEA_TOTAL_STORAGE_FILEPATH = "gs://teatotal-358fc.appspot.com/";

const db = getFirestore();

export const useBlackTeasFromFirebase = (): void => {
  const { state, dispatch } = useContentContext();

  useEffect(() => {
    console.log("Running: useBlackTeasFromFirebase");
    const getTeas = async () => {
      if (state.blackTeas.length === 0) {
        const teaData = [];
        const querySnapshot = await getDocs(collection(db, "blackTeas"));
        querySnapshot.forEach((doc) => {
          teaData.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ payload: teaData, type: ContentActions.BlackTeas });
      }
    };
    getTeas();
  }, []);
};

export const useHerbalTeasFromFirebase = (): void => {
  useEffect(() => {
    console.log("Running: useHerbalTeasFromFirebase");
    const getTeas = async () => {
      const collectionRef = await getDocs(collection(db, "herbalTeas"));
      collectionRef.forEach((doc) => {
        console.log(doc.data());
      });
    };
    getTeas();
  }, []);
};

export const useTeaLeavesFromFirebase = (): void => {
  const { state, dispatch } = useContentContext();

  useEffect(() => {
    console.log("Running: useTeaLeavesFromFirebase");
    const getTeaLeaves = async () => {
      if (state.teaLeaves.length === 0) {
        const docRef = doc(db, "tea-leaves", "daily-data");
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          const teaLeavesData = Object.keys(data).map((key) => {
            return data[key];
          });

          dispatch({ payload: teaLeavesData, type: ContentActions.TeaLeaves });
        }
      }
    };
    getTeaLeaves();
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
    console.log("Running: useImageFromFirebase");
    const getImage = async () => {
      await getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => setErrorMsg(error.message));
    };
    getImage();
  }, [urlString]);

  return [imageUrl, errorMsg];
};

export const useUserDataFromFirebase = (uid: string) => {
  const { user, setUser } = useContext(AppContext);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", uid), (doc) => {
      setUser({ ...user, ...doc.data() });
    });
    return () => unsubscribe();
  }, []);
};
