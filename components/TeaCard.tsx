import React, { useContext, ReactNode } from "react";

import AppContext from "../data/createContext";
import { TeaType } from "../data/firebase";
import { Image, Text, Box, Stack, Heading, Pressable } from "native-base";
import Rating from "./Rating";
import { useImageFromFirebase } from "../data/firebase";
import { useNavigation } from "@react-navigation/core";

type TeaCardProps = {
  id: string;
  teaData: TeaType;
};

function TeaCard({ id, teaData }: TeaCardProps): ReactNode {
  const navigation = useNavigation();
  const { desiredStrength, setChosenTea } = useContext(AppContext);
  const { name, strength, logo, rating } = teaData;
  const [image] = useImageFromFirebase(logo);

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

  const handleTeaSelection = (tea) => {
    setChosenTea(tea);
    navigation.navigate("TeaPage", {
      teaId: id,
    });
  };

  return (
    <Box bg="white" shadow={2} rounded="lg" m={4} width={["xs", "sm", "lg"]}>
      <Pressable key={id} onPress={() => handleTeaSelection(teaData)}>
        <Image
          source={{ uri: image }}
          alt={`${name} logo`}
          resizeMode="cover"
          height={150}
          roundedTop="md"
        />
        <Stack space={4} p={[4, 4, 8]}>
          <Heading color="primary.700" size={["md", "lg", "md"]} noOfLines={2}>
            {name}
          </Heading>
          <Text
            lineHeight={[5, 5, 7]}
            noOfLines={[4, 4, 2]}
            color="secondary.700"
          >
            {roundToHalf(
              desiredStrength * 2 * (strength === 10 ? 1 : 10 - strength)
            )}{" "}
            mins for the perfect brew
          </Text>
          <Rating count={parseInt(rating)} />
        </Stack>
      </Pressable>
    </Box>
  );
}

export default TeaCard;
