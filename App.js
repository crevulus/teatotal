import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import Home from "./views/Home";
import TeaPage from "./views/TeaPage";
import { Button } from "react-native";
// import ListsDisplay from "./mobx-training/ListsDisplay";

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
