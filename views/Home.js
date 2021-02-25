import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

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
      <Text>This is the Home page</Text>
      {teaData &&
        teaData.map((teaObj) => (
          <Button
            key={teaObj.id}
            title={`Go to ${teaObj.name}`}
            onPress={() =>
              navigation.navigate("TeaPage", {
                teaId: teaObj.id,
              })
            }
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
