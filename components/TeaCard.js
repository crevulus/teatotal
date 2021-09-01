import React, { useContext } from "react";
import { SafeAreaView, Pressable, StyleSheet } from "react-native";
import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Rating from "./Rating";
import AppContext from "../data/createContext";

const TeaCardHeader = ({ name }) => (
  <SafeAreaView>
    <Text category="h3">{name}</Text>
  </SafeAreaView>
);

function TeaCard({ id, teaData, strength }) {
  const { setChosenTea } = useContext(AppContext);

  const navigation = useNavigation();

  const handleClick = (tea) => {
    setChosenTea(tea);
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
    <Card
      style={styles.container}
      status="danger"
      appearance="filled"
      header={<TeaCardHeader name={teaData.name} />}
    >
      <Pressable
        key={id}
        onPress={() =>
          navigation.navigate("TeaPage", {
            teaId: id,
          })
        }
      >
        <Text>
          {roundToHalf(strength * (10 - teaData.strength))} mins for the perfect
          brew
        </Text>
        <Rating count={parseInt(teaData.rating)} />
        <Button onPress={() => handleClick({ id, teaData })}>Choose</Button>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: "1rem",
  },
});

export default TeaCard;
