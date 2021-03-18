// @ts-nocheck
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import * as firebase from "firebase";
import firebaseConfig from "./firebaseConfig.js";

import { userStore } from "./data/store";
import { observer } from "mobx-react";

import { Icon } from "react-native-elements";

import { Home } from "./views/Home";
import TeaPage from "./views/TeaPage";
import Auth from "./views/Auth.js";
import Profile from "./views/Profile.js";
// import ListsDisplay from "./mobx-training/ListsDisplay";

import AppStyles from "./AppStyles";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

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
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: AppStyles.colour.primary,
            },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            // headerLeft: () => (
            //   <Icon name="menu" size={30} color={AppStyles.colour.white} />
            // ),
            headerRight: () => (
              <Icon
                name="account-circle"
                size={30}
                color={AppStyles.colour.white}
              />
            ),
          }}
        >
          {/* <Stack.Screen name="ListDisplay" component={ListsDisplay} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TeaPage" component={TeaPage} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default observer(App);

// https://www.smashingmagazine.com/2020/08/mobx-state-manager-react-native-applications/
