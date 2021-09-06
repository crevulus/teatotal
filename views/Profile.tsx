import React, { useContext, ReactNode } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import AppContext from "../data/createContext";

const Profile = (): ReactNode => {
  const navigation = useNavigation();
  const { user } = useContext(AppContext);

  const onLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out!");
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.navigate("Home");
  };

  const handleLog = () => {
    console.log(user);
  };

  return user.email ? (
    <SafeAreaView>
      <Text>{user.email}</Text>
      <Button title="console log" onPress={handleLog} />
      <Button title="Log out" onPress={onLogOut} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  ) : (
    <Text>Not logged in</Text>
  );
};

export default Profile;
