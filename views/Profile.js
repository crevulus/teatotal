import React, { useState } from "react";
import { View, Text } from "react-native";

import firebase from "firebase/app";

import { userStore } from "../data/store";

const Profile = () => {
  return <View>{userStore.user && <Text>{userStore.user.email}</Text>}</View>;
};

export default Profile;
