import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import AppContext from "../data/createContext";

export default function TimerPage() {
  const { chosenTea, roundedMinutes } = useContext(AppContext);
  return (
    <SafeAreaView>
      <Text>{chosenTea.name}</Text>
      <Text>{roundedMinutes} mins</Text>
    </SafeAreaView>
  );
}
