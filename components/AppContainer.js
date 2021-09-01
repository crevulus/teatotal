import { StatusBar } from "expo-status-bar";
import React from "react";
import { useGetTeas } from "../data/firebase";
import DrawerNavigator from "../utils/navigation/DrawerNavigator";

export default function AppContainer(props) {
  console.log(props);
  useGetTeas();
  return (
    <>
      <DrawerNavigator />
      <StatusBar style="dark" />
    </>
  );
}
