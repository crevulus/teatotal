import React, { useState } from "react";
import { View, Text } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";

import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onSignUp = () => {
    console.log("signup");
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
