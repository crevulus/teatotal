import { StatusBar } from "expo-status-bar";
import React from "react";
import { useGetTeas } from "../data/firebase";
import DrawerNavigator from "../utils/navigation/DrawerNavigator";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function AppContainer() {
  useGetTeas();
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <DrawerNavigator />
        <StatusBar style="dark" />
      </ApplicationProvider>
    </>
  );
}
