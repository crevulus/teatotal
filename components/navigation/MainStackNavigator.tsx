/* eslint-disable react/prop-types */
import React, { ReactNode } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import {
//   useBlackTeasFromFirebase,
//   useTeaLeavesFromFirebase,
// } from "../../data/firebase";

import { Home } from "../../views/Home.tsx";
import { Auth } from "../../views/Auth";
import { Profile } from "../../views/Profile";
import { AppBar } from "../AppBar";
import { TeaPage } from "../../views/TeaPage";
import { TimerPage } from "../../views/TimerPage";
import { ContentProvider } from "../../data/createContext";

const Stack = createStackNavigator();

const HomeComponent = () => (
  <ContentProvider>
    <Home />
  </ContentProvider>
);

const MainStackNavigator = (): ReactNode => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ navigation }) => {
          return <AppBar navigation={navigation} style={{ height: 80 }} />;
        },
        headerShown: "screen",
      }}
    >
      <Stack.Screen name="Home" component={HomeComponent} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="TeaPage" component={TeaPage} />
      <Stack.Screen name="TimerPage" component={TimerPage} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
