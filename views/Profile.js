import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";

import { userStore } from "../data/store";
import { observer } from "mobx-react";

const Profile = () => {
  const navigation = useNavigation();

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
    console.log(userStore.getUserEmail());
  };

  return (
    userStore.user.email && (
      <View>
        <Text>{userStore.user.email}</Text>
        <Button title="console log" onPress={handleLog} />
        <Button title="Log out" onPress={onLogOut} />
      </View>
    )
  );
};

export default observer(Profile);
