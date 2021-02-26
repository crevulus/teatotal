import React from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Rating from "./Rating";

export default function TeaCard({ teaData, id }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Pressable
        key={id}
        title={`Go to ${teaData.name}`}
        onPress={() =>
          navigation.navigate("TeaPage", {
            teaId: id,
          })
        }
      >
        <Text>{teaData.name}</Text>
        <Rating count={teaData.rating} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: "5px",
    border: "1px solid black",
  },
});
