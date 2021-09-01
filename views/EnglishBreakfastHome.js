import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";
import AppContext from "../data/createContext";

export const EnglishBreakfastHome = () => {
  const [teaStrength, setTeaStrength] = useState(0.5);
  const { teas } = useContext(AppContext);

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.teaCardContainer}>
        {teas.length > 0 &&
          teas.map((teaObj) => (
            <TeaCard
              id={teaObj.id}
              teaData={teaObj.data}
              key={teaObj.id}
              strength={teaStrength * 2}
            />
          ))}
      </SafeAreaView>
      <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teaCardContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});
