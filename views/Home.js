import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TeaCard from "../components/TeaCard";

const Home = ({ navigation }) => {
  const [teaData, setTeaData] = useState("");

  const fetchTeaData = async () => {
    const teaData = await fetch(`http://localhost:3000/teas`).then((res) =>
      res.json()
    );
    setTeaData(teaData);
  };

  useEffect(() => {
    fetchTeaData();
  }, []);

  return (
    <View style={styles.container}>
      {teaData &&
        teaData.map((teaObj) => (
          <TeaCard id={teaObj.id} teaData={teaObj} key={teaObj.id} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Home;
