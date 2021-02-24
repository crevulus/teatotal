import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import Home from "./views/Home";
import Account from "./views/Account";
import { Button } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#7B232C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "semi-bold",
            },
            headerRight: () => (
              <Button title="info" onPress={() => alert("heyooooo")} />
            ),
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
