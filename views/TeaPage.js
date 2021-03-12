// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Linking, Button } from "react-native";

const TeaPage = (props) => {
  const [teaData, setTeaData] = useState("");

  const fetchTeaData = async () => {
    const teaData = await fetch(
      `http://localhost:3000/teas/${props.route.params.teaId}`
    ).then((res) => res.json());
    setTeaData(teaData);
  };

  useEffect(() => {
    fetchTeaData();
  }, []);

  return (
    <>
      {teaData && (
        <View>
          <Text>{teaData.name}</Text>
          <Image style={styles.logo} source={{ uri: teaData.logo }} />
          <Button
            title={`Get some ${teaData.name}`}
            onPress={() => Linking.openURL(teaData.url)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});

export default TeaPage;
