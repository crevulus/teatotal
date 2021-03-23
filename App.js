// @ts-nocheck
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig.js";

import { observer } from "mobx-react";

import DrawerNavigator from "./utils/navigation/DrawerNavigator";

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }
    });
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <DrawerNavigator />
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default observer(App);

// https://www.smashingmagazine.com/2020/08/mobx-state-manager-react-native-applications/
