import React, { ReactNode, useContext, useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/app";
import "firebase/firestore";

import AppContext from "../data/createContext";
import SignupForm from "../components/Signup";
import LoginForm from "../components/Login";
import { View } from "native-base";
import { AdMobBanner } from "expo-ads-admob";

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
    <View safeAreaTop flex flexDir="column" justifyContent="space-between">
      <View flexGrow={2} bg="white" overflow="none">
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
      </View>
      <View width="100%">
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds
        />
      </View>
    </View>
  );
};

export default Auth;
