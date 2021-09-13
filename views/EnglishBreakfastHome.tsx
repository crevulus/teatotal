import React, { useContext, ReactNode } from "react";
import { View, Center } from "native-base";
import { AdMobBanner } from "expo-ads-admob";

import ScrollCards from "../components/ScrollCards";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

export const EnglishBreakfastHome = (): ReactNode => {
  const { blackTeas } = useContext(AppContext);

  return (
    <View flex={1} bg="secondary.500">
      <ScrollCards teas={blackTeas} />
    </View>
  );
};
