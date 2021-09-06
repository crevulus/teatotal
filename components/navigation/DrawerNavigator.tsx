import React, { ReactNode } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { Box, Pressable, VStack, Text, HStack, Divider } from "native-base";

import MainStackNavigator from "./MainStackNavigator";
import Auth from "../../views/Auth";
import Profile from "../../views/Profile";
import { NavigationProp } from "@react-navigation/core";

const Drawer = createDrawerNavigator();

const SCREENS_STACK = [
  {
    name: "Home",
    component: MainStackNavigator,
  },
  {
    name: "Auth",
    component: Auth,
  },
  {
    name: "Profile",
    component: Profile,
  },
];

const DrawerNavigator = (): ReactNode => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {SCREENS_STACK.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

type CustomDrawerContentPropsType = {
  navigation: NavigationProp;
};

function CustomDrawerContent({ navigation }: CustomDrawerContentPropsType) {
  return (
    <DrawerContentScrollView safeArea>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700">
            Mail
          </Text>
          <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
            john_doe@gmail.com
          </Text>
        </Box>

        <VStack divider={<Divider />} space={4}>
          <VStack space={3}>
            {SCREENS_STACK.map((screen, index) => (
              <Pressable
                key={index}
                px={5}
                py={3}
                rounded="md"
                bg="gray.500"
                onPress={() => {
                  navigation.navigate(screen.name);
                }}
              >
                <HStack space={7} alignItems="center">
                  <Text fontWeight={500} color="primary.500">
                    {screen.name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

export default DrawerNavigator;
