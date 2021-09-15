import React, { ReactNode, useContext, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import "firebase/firestore";

import AppContext from "../data/createContext";
import SignupForm from "../components/Signup";
import LoginForm from "../components/Login";

const Auth = (): ReactNode => {
  const navigation = useNavigation();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useContext(AppContext);

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
        console.log(error);
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
      {signUp ? (
        <SignupForm
          togglePage={() => setSignUp(!signUp)}
          setEmail={setEmail}
          setPw={setPw}
          handlePress={onSignUp}
        />
      ) : (
        <LoginForm
          togglePage={() => setSignUp(!signUp)}
          setEmail={setEmail}
          setPw={setPw}
          handlePress={onLogIn}
        />
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  );
};

export default Auth;
