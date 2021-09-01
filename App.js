// @ts-nocheck
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as firebase from "firebase";

import AppContext from "./data/createContext.js";
import AppContainer from "./components/AppContainer";

import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./styles/custom-theme.json";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [teas, setTeas] = useState([]);
  const [user, setUser] = useState({});
  const [chosenTea, setChosenTea] = useState({});

  const { Provider } = AppContext;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
      }
    });
  });

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider
          value={{
            loggedIn,
            setLoggedIn,
            teas,
            setTeas,
            user,
            setUser,
            chosenTea,
            setChosenTea,
          }}
        >
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <AppContainer />
          </ApplicationProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
