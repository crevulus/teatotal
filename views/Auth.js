import React, { useState } from "react";
import { Text, Button, TextInput, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import "firebase/firestore";

import { userStore } from "../data/store";
import { observer } from "mobx-react";

const Auth = () => {
  const navigation = useNavigation();

  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onLogIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .then((user) => userStore.setUser(user))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + ": " + errorMessage);
      });
    navigation.navigate("Profile");
  };

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
        return res.user;
      })
      .then((user) => userStore.setUser(user))
      .catch((err) => console.error(err));
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView>
      <Button title="Toggle" onPress={() => setSignUp(true)} />
      <Text>{signUp ? "Sign Up" : "Log In"}</Text>
      <TextInput
        placeholder="Enter your email"
        onChangeText={(name) => setEmail(name)}
      />
      <TextInput placeholder="Enter your pw" onChangeText={(pw) => setPw(pw)} />
      {signUp ? (
        <Button title="Sign Up" onPress={onSignUp} />
      ) : (
        <Button title="Log In" onPress={onLogIn} />
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
      {userStore.user && <Text>{userStore.user.email}</Text>}
    </SafeAreaView>
  );
};

export default observer(Auth);
