import React, { useContext, ReactNode } from "react";
import { View } from "native-base";

import ScrollCards from "../components/ScrollCards";

import AppContext from "../data/createContext";

export const EnglishBreakfastHome = (): ReactNode => {
  const { blackTeas } = useContext(AppContext);

  return (
    <View bg="white">
      <ScrollCards teas={blackTeas} />
    </View>
  );
};
