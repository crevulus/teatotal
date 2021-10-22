import React, { ReactNode, useContext } from "react";
import AppContext from "../data/createContext";

import { Timer } from "../components/Timer.tsx";
import { Center, Divider, View } from "native-base";
import { theme } from "../theme";
import TeaReading from "../components/TeaReading";

export function TimerPage(): ReactNode {
  const { chosenTea } = useContext(AppContext);
  const brewTime = new Date();
  brewTime.setSeconds(brewTime.getSeconds() + chosenTea.roundedMinutes * 60);

  return (
    <View safeArea bg={theme.other.white} flexGrow={1}>
      <Center flex>
        <Timer expiryTimestamp={brewTime} teaData={chosenTea} />
        <Divider my={2} />
        <TeaReading />
      </Center>
    </View>
  );
}
