import React from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Rating from "./Rating";

import AppStyles from "../AppStyles";

function TeaCard({ teaData, strength, handleChoose }) {
  const navigation = useNavigation();

  const handleClick = (tea) => {
    handleChoose(tea);
  };

  const roundToHalf = (value) => {
    let decimal = value - parseInt(value, 10);
    decimal = Math.round(decimal * 10);
    if (decimal == 5) {
      return parseInt(value, 10) + 0.5;
    }
    if (decimal < 3 || decimal > 7) {
      return Math.round(value);
    } else {
      return parseInt(value, 10) + 0.5;
    }
  };

  return (
    <View style={styles.card}>
      <Pressable
        key={teaData.id}
        onPress={() =>
          navigation.navigate("TeaPage", {
            teaId: teaData.id,
          })
        }
      >
        <View>
          <Text>{teaData.name}</Text>
          <Text>
            {roundToHalf(strength * (10 - teaData.strength))} mins for the
            perfect brew
          </Text>
        </View>
        <Rating count={teaData.rating} />
        <Button
          title="Choose"
          onPress={() => handleClick(teaData.name)}
          color={AppStyles.colour.secondary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: "5px",
    border: "1px solid black",
    width: "90%",
  },
});

export default TeaCard;
