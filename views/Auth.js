import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import "firebase/firestore";

import { TextInput } from "react-native-gesture-handler";

const Auth = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
          });
      })
      .catch((err) => console.error(err));
    navigation.navigate("Profile");
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Enter your email"
        onChangeText={(name) => setEmail(name)}
      />
      <TextInput placeholder="Enter your pw" onChangeText={(pw) => setPw(pw)} />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
};

export default Auth;
