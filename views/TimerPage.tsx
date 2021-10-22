import React, { ReactNode, useContext } from "react";
import AppContext from "../store/createContext.ts";

import { Timer } from "../components/Timer.tsx";
import { Center, Divider, View } from "native-base";
import { theme } from "../theme";
import { TeaReading } from "../components/TeaReading";
import { useTeaLeavesFromFirebase } from "../data/firebase";
import { useTeaSettingsContext } from "../store/createContext";

export function TimerPage(): ReactNode {
  useTeaLeavesFromFirebase();
  const { state } = useTeaSettingsContext();
  const brewTime = new Date();
  brewTime.setSeconds(
    brewTime.getSeconds() + state.chosenTea.roundedMinutes * 60
  );

  return (
    <View safeArea bg={theme.other.white} flexGrow={1}>
      <Center flex>
        <Timer expiryTimestamp={brewTime} teaData={state.chosenTea} />
        <Divider my={2} />
        <TeaReading />
      </Center>
    </View>
  );
}
