/* eslint-disable react/prop-types */
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { AppBar } from "../../components/AppBar";

import { EnglishBreakfastHome } from "../../views/EnglishBreakfastHome";
import TeaPage from "../../views/TeaPage";
import Auth from "../../views/Auth";
import Profile from "../../views/Profile";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator header={<AppBar />}>
      <Stack.Screen
        name="Home"
        component={EnglishBreakfastHome}
        options={(props) => {
          const { toggleDrawer } = props.navigation;
          return {
            // eslint-disable-next-line react/display-name
            headerLeft: () => (
              <Icon name="menu" size={30} onPress={toggleDrawer} />
            ),
          };
        }}
      />
      <Stack.Screen name="TeaPage" component={TeaPage} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
