import React, { ReactNode, useContext } from "react";
import AppContext from "../data/createContext";

import { Timer } from "../components/Timer.tsx";
import { Center, Divider, View } from "native-base";
import { theme } from "../theme";
import TeaReading from "../components/TeaReading";

const chosenTea = {
  strength: 7,
  logo: "gs://teatotal-358fc.appspot.com/Tetley_Group_Logo.png",
  name: "Tetley",
  reviewCount: 1,
  url: "https://www.tetley.co.uk/",
  rating: 2.5,
  roundedMinutes: 3,
};

export function TimerPage(): ReactNode {
  // const { chosenTea } = useContext(AppContext);
  const brewTime = new Date();
  brewTime.setSeconds(brewTime.getSeconds() + chosenTea.roundedMinutes * 60);

  return (
    <View safeArea bg={theme.other.white} flex={1}>
      <Center>
        <Timer expiryTimestamp={brewTime} teaData={chosenTea} />
        <Divider width="90%" my={2} thickness="2" />
        <TeaReading />
      </Center>
    </View>
  );
}
