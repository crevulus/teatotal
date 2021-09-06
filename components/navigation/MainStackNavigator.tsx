/* eslint-disable react/prop-types */
import React, { ReactNode } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { EnglishBreakfastHome } from "../../views/EnglishBreakfastHome";
import TeaPage from "../../views/TeaPage";
import Auth from "../../views/Auth";
import Profile from "../../views/Profile";
import { AppBar } from "../AppBar";

const Stack = createStackNavigator();

const MainStackNavigator = (): ReactNode => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppBar,
      }}
    >
      <Stack.Screen name="Home" component={EnglishBreakfastHome} />
      <Stack.Screen name="TeaPage" component={TeaPage} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
