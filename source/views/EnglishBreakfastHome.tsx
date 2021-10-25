import React, { ReactNode, useMemo } from "react";
import { View } from "native-base";

import { ScrollCards } from "../components/layout/ScrollCards";

import { useContentContext } from "../store/createContext.ts";

export const EnglishBreakfastHome = (): ReactNode => {
  const { state } = useContentContext();

  return useMemo(
    () => (
      <View flex={1} bg="white">
        <ScrollCards data={state.blackTeas} type="tea" />
      </View>
    ),
    [state.blackTeas]
  );
};
