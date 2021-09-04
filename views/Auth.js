import React, { useContext, useState } from "react";
import { Text, Button, TextInput, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import "firebase/firestore";

import AppContext from "../data/createContext";

const Auth = () => {
  const navigation = useNavigation();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { user, setUser } = useContext(AppContext);

  const onLogIn = async () => {
    let success = false;
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .then((user) => {
        success = true;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + ": " + errorMessage);
      });
    if (success) {
      navigation.navigate("Profile");
    }
  };

  const onSignUp = async () => {
    let success = false;
    await firebase
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
      .then((user) => {
        success = true;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + ": " + errorMessage);
      });
    if (success) {
      navigation.navigate("Profile");
    }
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
      {user && <Text>{user.email}</Text>}
    </SafeAreaView>
  );
};

export default Auth;