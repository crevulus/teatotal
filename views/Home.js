import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is not the Home page</Text>
      <Button
        title="Go to account"
        onPress={() => navigation.navigate("Account")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
