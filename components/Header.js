import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";

export const AppHeader = () => {
  return (
    <View>
      <Header
        style={styles.main}
        leftComponent={{ text: "a" }}
        centerComponent={{ text: "b" }}
        rightComponent={{ text: "c" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
