// @ts-nocheck
import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { observer } from "mobx-react";

import TeaCard from "../components/TeaCard";

import StrengthSlider from "../components/StrengthSlider";

export const Home = observer(({ userStore }) => {
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
  };

  const handleChildSliderChange = (value) => {
    setTeaStrength(value);
  };

  return (
    <View style={styles.container}>
      <Button title="Auth" onPress={() => navigation.navigate("Auth")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      {/* {store.tea && <Text>You love {store.tea}</Text>} */}
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
