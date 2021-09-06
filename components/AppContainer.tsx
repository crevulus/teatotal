import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { useTeasFromFirebase } from "../data/firebase";
import DrawerNavigator from "./navigation/DrawerNavigator.tsx";

export default function AppContainer(): ReactNode {
  useTeasFromFirebase();
  return (
    <>
      <DrawerNavigator />
      <StatusBar style="dark" />
    </>
  );
}
