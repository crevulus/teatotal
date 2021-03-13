// @ts-nocheck
import "react-native-gesture-handler";
import React from "react";
import { Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { Home } from "./views/Home";
import TeaPage from "./views/TeaPage";
// import ListsDisplay from "./mobx-training/ListsDisplay";

import AppStyles from "./AppStyles";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: AppStyles.colour.primary,
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <Button
                title="info"
                onPress={() => alert("heyooooo")}
                color={AppStyles.colour.secondary}
              />
            ),
          }}
        >
          {/* <Stack.Screen name="ListDisplay" component={ListsDisplay} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TeaPage" component={TeaPage} />
        </Stack.Navigator>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

// https://www.smashingmagazine.com/2020/08/mobx-state-manager-react-native-applications/
