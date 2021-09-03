import React, { useContext, ReactNode } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Pressable, Text, Container } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Rating from "./Rating";
import AppContext from "../data/createContext";
import { TeaType } from "../data/firebase";

type TeaCardProps = {
  id: string;
  teaData: TeaType;
  strength: number;
};

function TeaCard({ id, teaData, strength }: TeaCardProps): ReactNode {
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
    <Container style={styles.container}>
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
        <Button bg="amber.400" onPress={() => handleClick({ id, teaData })}>
          Choose
        </Button>
      </Pressable>
    </Container>
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
