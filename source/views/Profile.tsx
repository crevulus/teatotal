import React, { useContext, ReactNode } from "react";
import { View, Text, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { getAuth, signOut } from "firebase/auth";
import format from "date-fns/format";

import AppContext from "../store/createContext.ts";
import { useUserDataFromFirebase } from "../data/firebase";
import { SimpleButton } from "../components/atoms/Button";

const userObj = {
  providerId: "firebase",
  emailVerified: false,
  isAnonymous: false,
  tenantId: null,
  providerData: "[{…}]",
  proactiveRefresh: "{errorBackoff: 30000, isRunning: true, timerId: 233…}",
  reloadUserInfo: '{createdAt: "1636298581445", email: "test@test.com"…}',
  reloadListener: null,
  uid: "jjFIJqC8iKVPqsLWQGfGCMIikEs2",
  auth: "{_canInitEmulator: false, _deleted: false, _errorFa…}",
  stsTokenManager: '{accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NGNm…}',
  accessToken:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NGNmYTAxOTgyMDNlMjgwN2Q4MzRkYmE2MjBlZjczZjI4ZTRlMmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVhdG90YWwtMzU4ZmMiLCJhdWQiOiJ0ZWF0b3RhbC0zNThmYyIsImF1dGhfdGltZSI6MTYzNjI5ODc1NywidXNlcl9pZCI6ImpqRklKcUM4aUtWUHFzTFdRR2ZHQ01JaWtFczIiLCJzdWIiOiJqakZJSnFDOGlLVlBxc0xXUUdmR0NNSWlrRXMyIiwiaWF0IjoxNjM2Mjk4NzU3LCJleHAiOjE2MzYzMDIzNTcsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0Z...",
  displayName: null,
  email: "test@test.com",
  phoneNumber: null,
  photoURL: null,
  metadata: '{createdAt: "1636298581445", creationTime: "Sun, 07…}',
  createdAt: { nanoseconds: 209000000, seconds: 1636298583 },
  profileAvatar:
    '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><metadata><rdf:RDF><cc:Work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title>Bottts</dc:title><dc:creator><cc:Agent><dc:title>Pablo Stanley</dc:title></cc:Agent></dc:creator><dc:source>https://bot...',
};

export const Profile = (): ReactNode => {
  const navigation = useNavigation();
  // const { user, setUser } = useContext(AppContext);
  // useUserDataFromFirebase(user.uid);

  const user = userObj;

  const auth = getAuth();
  const onLogOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser({});
        console.log("Signed out!");
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.navigate("Home");
  };

  const handleLog = () => {
    console.log(user);
  };

  return user.email ? (
    <View>
      <Text>{user.email}</Text>
      {user.createdAt && (
        <Text>
          Member since{" "}
          {format(new Date(user.createdAt.seconds * 1000), "dd MMM yyyy")}
        </Text>
      )}
      <SimpleButton onPress={handleLog}>Console Log</SimpleButton>
      <SimpleButton onPress={onLogOut}>Log out</SimpleButton>
    </View>
  ) : (
    <Text>Not logged in</Text>
  );
};
