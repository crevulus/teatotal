import React, { ReactNode, useContext } from "react";
import { HStack, IconButton, Text, Box } from "native-base";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import AppContext from "../data/createContext";

export function AppBar(): ReactNode {
  const navigation = useNavigation();
  const { user } = useContext(AppContext);

  console.log(navigation);
  const profileTarget = user.email ? "Profile" : "Auth";

  return (
    <>
      <Box safeAreaTop backgroundColor="primary.900" />
      <HStack
        bg="primary.700"
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space={4} alignItems="center">
          <IconButton
            icon={
              <Icon
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            }
          />
          <Text color="white" fontSize={20} fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                name="account-circle"
                size={30}
                color="white"
                onPress={() => navigation.navigate(profileTarget)}
              />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}
