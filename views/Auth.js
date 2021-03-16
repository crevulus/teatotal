import React, { useState } from "react";
import { View, Text } from "react-native";

import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const onSignUp = () => {};

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

// https://www.freecodecamp.org/news/google-login-with-react-native-and-firebase/
