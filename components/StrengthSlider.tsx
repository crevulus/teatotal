import React, { ReactNode, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Container, Slider } from "native-base";

type StrengthSliderPropTypes = {
  handleChildSliderChange: () => void;
};

export default function StrengthSlider({
  handleChildSliderChange,
}: StrengthSliderPropTypes): ReactNode {
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    handleChildSliderChange(value);
  };

  return (
    <Container style={styles.container}>
      <Text>Strengthometer: {sliderValue * 10}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        step={0.1}
        onValueChange={(value) => handleSliderChange(value)}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: "100%",
  },
});
