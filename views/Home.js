// @ts-nocheck
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";

import { ChooseTea } from "../data/store";
import { observer } from "mobx-react";

export const Home = observer(() => {
  const store = new ChooseTea();

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
    store.selectTea(tea);
    console.log(store.tea);
  };

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <View style={styles.container}>
      <Text>You love {store.tea}</Text>
      <View style={styles.teaCardContainer}>
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
      </View>
      <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
    </View>
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
