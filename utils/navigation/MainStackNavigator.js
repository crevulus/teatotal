import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { EnglishBreakfastHome } from "../../views/EnglishBreakfastHome";
import TeaPage from "../../views/TeaPage";
import Auth from "../../views/Auth";
import Profile from "../../views/Profile";

import AppStyles from "../../AppStyles";

import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: AppStyles.colour.primary,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerRight: () => (
          <Icon
            name="account-circle"
            size={30}
            color={AppStyles.colour.white}
            onPress={() => navigation.navigate("Profile")}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={EnglishBreakfastHome}
        options={(props) => {
          const { toggleDrawer } = props.navigation;
          return {
            headerLeft: () => (
              <Icon
                name="menu"
                size={30}
                color={AppStyles.colour.white}
                onPress={toggleDrawer}
              />
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
