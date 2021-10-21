import React, { useContext, ReactNode, useMemo } from "react";
import { View } from "native-base";

import ScrollCards from "../components/layout/ScrollCards";

import AppContext from "../data/createContext";

export const EnglishBreakfastHome = (): ReactNode => {
  const { blackTeas } = useContext(AppContext);

  return useMemo(() => (
    <View flex={1} bg="white">
      <ScrollCards data={blackTeas} type="tea" />
    </View>
  ));
};
