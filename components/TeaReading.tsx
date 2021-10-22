import React, { ReactNode, useContext } from "react";
import { View, Text } from "native-base";
import { Tabs } from "./layout/Tabs";
import { theme } from "../theme";
import ScrollCards from "./layout/ScrollCards";
import AppContext from "../data/createContext";

const FirstRoute = () => {
  const { teaLeaves } = useContext(AppContext);

  return (
    <View flex={1} bg={theme.primary} h="100%" flexGrow={1}>
      <ScrollCards type="leaves" data={teaLeaves} />
    </View>
  );
};

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
      <Tabs scenes={scenes} />
    </View>
  );
};

export default TeaReading;
