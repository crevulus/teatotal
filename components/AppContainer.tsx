import React from "react";
import { StatusBar } from "expo-status-bar";
import { useGetTeasFromFirebase } from "../data/firebase";
import DrawerNavigator from "../utils/navigation/DrawerNavigator";

export default function AppContainer() {
  useGetTeasFromFirebase();
  return (
    <>
      <DrawerNavigator />
      <StatusBar style="dark" />
    </>
  );
}
