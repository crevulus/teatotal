import React, { ReactNode, useEffect } from "react";
import { Center, Heading, HStack, Text, View } from "native-base";
import { useTimer } from "react-timer-hook";
import { Audio } from "expo-av";

import { SimpleButton } from "./atoms/Button";
import { TeaType } from "../data/firebase";

type TimerProps = {
  expiryTimestamp: number;
  teaData: TeaType;
};

export function Timer({ expiryTimestamp, teaData }: TimerProps): ReactNode {
  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const padTimings = (timing: number) => {
    const value = timing.toString();
    if (value.length <= 1) {
      return value.padStart(2, "0");
    } else return value;
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/ringer2.mp3")
    );
    await sound.playAsync();
  }

  const handleRestart = () => {
    const brewTime = new Date();
    brewTime.setSeconds(brewTime.getSeconds() + teaData.roundedMinutes * 60);
    restart(brewTime, false);
  };

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      playSound();
    }
  }, [seconds, minutes]);

  return (
    <View>
      <Center>
        <Heading>{teaData.name}</Heading>
        <Text>Your tea will be ready in</Text>
        <View>
          <Heading>
            {padTimings(minutes)}:{padTimings(seconds)}
          </Heading>
        </View>
        <HStack space={3}>
          <SimpleButton variant="icon" iconName="play-arrow" onPress={start} />
          <SimpleButton variant="icon" iconName="pause" onPress={pause} />
          <SimpleButton
            variant="icon"
            iconName="replay"
            onPress={handleRestart}
          />
        </HStack>
      </Center>
    </View>
  );
}
