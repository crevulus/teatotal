import React, { ReactNode, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image } from "native-base";
import { AdMobBanner } from "expo-ads-admob";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import AppContext from "../store/createContext.ts";
import SignupForm from "../components/Signup";
import LoginForm from "../components/Login";
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
  const googleProvider = new GoogleAuthProvider();

  const navigateToProfile = (success: boolean) => {
    if (success) {
      navigation.navigate("Profile");
    }
  };

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
        // setPersistence(auth, inMemoryPersistence);
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + ": " + errorMessage);
      });
    navigateToProfile(success);
  };

  const onSignUp = async () => {
    let success = false;
    await createUserWithEmailAndPassword(auth, email, pw)
      .then((res) => {
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
    navigateToProfile(success);
  };

  const handleGoogleLogIn = async () => {
    let success = false;
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        success = true;
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
    navigateToProfile(success);
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
        <Pressable onPress={handleGoogleLogIn}>
          <Image
            source={require("assets/google-signin.png")}
            alt="Log in with Google"
            height={46}
            width={191}
          />
        </Pressable>
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
