import React, { ReactNode } from "react";
import { View, Text } from "native-base";
import { Tabs } from "./layout/Tabs";
import { theme } from "../theme";

const FirstRoute = () => (
  <View flex={1} bg={theme.primary} h="100%" flexGrow={1}>
    <Text>This is daily Digest</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const TeaReading = (): ReactNode => {
  const scenes = [
    {
      key: "first",
      title: "Daily Digest",
      component: FirstRoute,
    },
    {
      key: "second",
      title: "Article",
      component: SecondRoute,
    },
  ];
  return (
    <View flex={1} flexGrow={1} maxW="100%">
      <Text>Some easy reading while you wait</Text>
      <Tabs scenes={scenes} />
    </View>
  );
};

export default TeaReading;
