// @ts-nocheck
import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { observer } from "mobx-react";
import { teaStore } from "../data/store";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";

export const EnglishBreakfastHome = observer(() => {
  const navigation = useNavigation();

  const [teaData, setTeaData] = useState("");
  const [teaStrength, setTeaStrength] = useState(0.5);

  const fetchTeaData = async () => {
    const teaData = await fetch(`http://localhost:3000/teas`).then((res) =>
      res.json()
    );
    setTeaData(teaData);
  };

  useEffect(() => {
    fetchTeaData();
  }, []);

  const handleChildChoose = (tea) => {
    // store.selectTea(tea);
    console.log(teaStore.teas);
  };

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {store.tea && <Text>You love {store.tea}</Text>} */}
      <SafeAreaView style={styles.teaCardContainer}>
        {teaData &&
          teaData.map((teaObj) => (
            <TeaCard
              id={teaObj.id}
              teaData={teaObj}
              key={teaObj.id}
              strength={teaStrength * 2}
              handleChoose={handleChildChoose}
            />
          ))}
      </SafeAreaView>
      <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teaCardContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});
