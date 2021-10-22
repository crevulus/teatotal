import React, { ReactNode, useMemo } from "react";
import { View } from "native-base";

import ScrollCards from "../components/layout/ScrollCards";

import { useContentContext } from "../data/createContext.tsx";

export const EnglishBreakfastHome = (): ReactNode => {
  const { state } = useContentContext();

  return useMemo(() => (
    <View flex={1} bg="white">
      <ScrollCards data={state.blackTeas} type="tea" />
    </View>
  ));
};
