// @ts-nocheck
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TeaCard from "../components/TeaCard";

import AppStyles from "../AppStyles";
import StrengthSlider from "../components/StrengthSlider";

const Home = ({ navigation }) => {
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

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.teaCardContainer}>
        {teaData &&
          teaData.map((teaObj) => (
            <TeaCard
              id={teaObj.id}
              teaData={teaObj}
              key={teaObj.id}
              strength={teaStrength * 2}
            />
          ))}
      </View>
      <StrengthSlider handleChildSliderChange={handleChildSliderChange} />
    </View>
  );
};

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

export default Home;
