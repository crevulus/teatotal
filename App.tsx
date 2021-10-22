// import "react-native-gesture-handler";
import React, { useEffect, useState, ReactNode } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import AppContext from "./store/createContext.ts";
import MainStackNavigator from "./components/navigation/MainStackNavigator";

const App = (): ReactNode => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const { Provider } = AppContext;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
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
            user,
            setUser,
          }}
        >
          <NativeBaseProvider>
            <MainStackNavigator />
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
