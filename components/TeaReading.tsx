import React, { ReactNode } from "react";
import { View } from "native-base";
import { Tabs } from "./layout/Tabs";
import { theme } from "../theme";
import ScrollCards from "./layout/ScrollCards";
import { useContentContext } from "../store/createContext.ts";

const FirstRoute = () => {
  const { state } = useContentContext();

  return (
    <View flex={1} bg={theme.primary} h="100%" flexGrow={1}>
      <ScrollCards type="leaves" data={state.teaLeaves} />
    </View>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

export const TeaReading = (): ReactNode => {
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
