import React, { useState } from "react";
import { View, Text } from "react-native";

import firebase from "firebase/app";

import { LoginUser } from "../data/store";

const Profile = () => {
  const [store] = useState(() => new LoginUser());

  console.log(store.user);

  return <View>{/* <Text>{user.displayName}</Text> */}</View>;
};

export default Profile;
