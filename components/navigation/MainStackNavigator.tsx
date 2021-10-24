import React, { ReactNode } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../../views/Home.tsx";
import { Auth } from "../../views/Auth";
import { Profile } from "../../views/Profile";
import { AppBar } from "../AppBar";
import { TeaPage } from "../../views/TeaPage";
import { TimerPage } from "../../views/TimerPage";
import {
  ContentProvider,
  TeaSettingsProvider,
} from "../../store/createContext.ts";

const Stack = createStackNavigator();

const HomeComponent = () => (
  <ContentProvider>
    <Home />
  </ContentProvider>
);

const TimerComponent = () => (
  <ContentProvider>
    <TimerPage />
  </ContentProvider>
);

import { NavigationState } from "react-navigation";

export const getActiveRouteState = function (
  route: NavigationState
): NavigationState {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index] as NavigationState;
  return getActiveRouteState(childActiveRoute);
};

const MainStackNavigator = (): ReactNode => {
  return (
    <TeaSettingsProvider>
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
        <Stack.Screen name="TimerPage" component={TimerComponent} />
      </Stack.Navigator>
    </TeaSettingsProvider>
  );
};

export default MainStackNavigator;
