import { StatusBar } from "expo-status-bar";
import firebase from "firebase";
import React from "react";
import { useGetTeas } from "../data/firebase";
import DrawerNavigator from "../utils/navigation/DrawerNavigator";
import firebaseConfig from "../firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export default function AppContainer() {
  useGetTeas(app);
  return (
    <>
      <DrawerNavigator />
      <StatusBar style="dark" />
    </>
  );
}
