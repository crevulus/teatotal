import React, { useContext, ReactNode, useState, useEffect } from "react";

import AppContext from "../data/createContext.tsx";
import { TeaType, useImageFromFirebase } from "../data/firebase";
import { Image, Stack, Pressable, HStack, View } from "native-base";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "react-native-elements";

import { SimpleButton } from "./atoms/Button";
import { theme } from "../theme";
import { Card } from "./atoms/Card";
import { SimpleHeading } from "./atoms/Heading";

type TeaCardProps = {
  id: string;
  teaData: TeaType;
};

export function TeaCard({ id, teaData }: TeaCardProps): ReactNode {
  const navigation = useNavigation();
  const { desiredStrength, setChosenTea } = useContext(AppContext);
  const { name, strength, logo, rating } = teaData;
  const [image] = useImageFromFirebase(logo);
  const [roundedMinutes, setRoundedMinutes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const roundToHalf = (value) => {
    let decimal = value - parseInt(value, 10);
    decimal = Math.round(decimal * 10);
    if (decimal === 5) {
      return parseInt(value, 10) + 0.5;
    }
    if (decimal < 3 || decimal > 7) {
      return Math.round(value);
    } else {
      return parseInt(value, 10) + 0.5;
    }
  };

  useEffect(() => {
    if (!desiredStrength) {
      return;
    }
    setRoundedMinutes(
      roundToHalf(desiredStrength * 2 * (strength === 10 ? 1 : 10 - strength))
    );
    setIsLoading(false);
  }, [desiredStrength]);

  const handleTeaSelection = (tea) => {
    setChosenTea({ ...tea, roundedMinutes });
    navigation.navigate("TeaPage", { teaName: teaData.name });
  };

  const handleGoToTimer = (tea) => {
    setChosenTea({ ...tea, roundedMinutes });
    navigation.navigate("TimerPage", { teaName: teaData.name });
  };

  if (!image) {
    return null;
  }

  return (
    <Card>
      <Pressable key={id} onPress={() => handleTeaSelection(teaData)}>
        <Image
          source={{ uri: image }}
          alt={`${name} logo`}
          resizeMode="cover"
          height={150}
          roundedTop="md"
        />
        <HStack flexGrow={1}>
          <Stack space={4} p={[4, 4, 8]}>
            <SimpleHeading>{name}</SimpleHeading>
            <Rating count={parseInt(rating)} />
          </Stack>
          <View flex flexGrow={1} alignContent="center" justifyContent="center">
            <SimpleButton
              m={6}
              isLoading={isLoading}
              isLoadingText="Loading..."
              onPress={() => handleGoToTimer(teaData)}
            >
              <Icon name="timer" size={30} color={theme.other.white} />
              {`${roundedMinutes} mins`}
            </SimpleButton>
          </View>
        </HStack>
      </Pressable>
    </Card>
  );
}
