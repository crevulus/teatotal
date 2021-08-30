import React from "react";
import { SafeAreaView, Pressable, StyleSheet } from "react-native";
import { Text, Button, Card } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Rating from "./Rating";

const TeaCardHeader = ({ name }) => (
  <SafeAreaView>
    <Text category="h3">{name}</Text>
  </SafeAreaView>
);

function TeaCard({ id, teaData, strength, handleChoose }) {
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
    <SafeAreaView>
      <Card status="danger" header={<TeaCardHeader name={teaData.name} />}>
        <Pressable
          key={id}
          onPress={() =>
            navigation.navigate("TeaPage", {
              teaId: id,
            })
          }
        >
          <SafeAreaView>
            <Text>
              {roundToHalf(strength * (10 - teaData.strength))} mins for the
              perfect brew
            </Text>
          </SafeAreaView>
          <Rating count={teaData.rating} />
          <Button onPress={() => handleClick(teaData.name)}>Choose</Button>
        </Pressable>
      </Card>
    </SafeAreaView>
  );
}

export default TeaCard;
