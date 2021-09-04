import React from "react";
import { StatusBar } from "expo-status-bar";
import { useTeasFromFirebase } from "../data/firebase";
import DrawerNavigator from "../utils/navigation/DrawerNavigator";

export default function AppContainer() {
  useTeasFromFirebase();
  return (
    <>
      <DrawerNavigator />
      <StatusBar style="dark" />
    </>
  );
}
