import React, { ReactNode, useContext } from "react";
import { useRoute } from "@react-navigation/native";

import { HStack, IconButton, Text, Box } from "native-base";
import { Icon } from "react-native-elements";

import AppContext from "../data/createContext";
import { theme } from "../theme";

type AppBarPropsType = {
  navigation: NavigationProp;
};

export function AppBar(props: AppBarPropsType): ReactNode {
  const { user } = useContext(AppContext);
  const route = useRoute();

  const profileTarget = user.email ? "Profile" : "Auth";

  return (
    <>
      <Box safeAreaTop backgroundColor={theme.primary} />
      <HStack
        bg={theme.primary}
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center" ml={3}>
          {props.navigation.canGoBack() && (
            <IconButton
              mr={4}
              icon={
                <Icon
                  name="arrow-back"
                  size={30}
                  color="white"
                  onPress={() => props.navigation.goBack()}
                />
              }
            />
          )}
          <Text color="white" fontSize={20} fontWeight="bold">
            {route.params ? route.params.teaName : route.name}
          </Text>
        </HStack>
        <HStack space={2}>
          {route.name === "Home" ? (
            <IconButton
              icon={
                <Icon
                  name="account-circle"
                  size={30}
                  color="white"
                  onPress={() => props.navigation.navigate(profileTarget)}
                />
              }
            />
          ) : (
            <IconButton
              icon={
                <Icon
                  name="free-breakfast"
                  size={30}
                  color="white"
                  onPress={() => props.navigation.navigate("Home")}
                />
              }
            />
          )}
        </HStack>
      </HStack>
    </>
  );
}
