import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainStackNavigator from "./MainStackNavigator";

import Auth from "../../views/Auth";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="Auth" component={Auth} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
