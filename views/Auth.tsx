import React, { ReactNode, useContext, useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import AppContext from "../store/createContext.ts";
import SignupForm from "../components/Signup";
import LoginForm from "../components/Login";
import { View } from "native-base";
import { AdMobBanner } from "expo-ads-admob";
import { theme } from "../theme";

// TODO: Add Logout
// TODO: Add auth persistence

export const Auth = (): ReactNode => {
  const navigation = useNavigation();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useContext(AppContext);

  const auth = getAuth();

  const onLogIn = async () => {
    let success = false;
    await signInWithEmailAndPassword(auth, email, pw)
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
    await createUserWithEmailAndPassword(auth, email, pw)
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
    <View
      safeAreaTop
      flex={1}
      flexDir="column"
      justifyContent="space-between"
      bg={theme.other.white}
    >
      <View flexBasis={1} bg={theme.other.white} overflow="none">
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
