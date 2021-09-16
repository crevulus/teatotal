import React, { ReactNode, useContext, useState } from "react";
import { Text, Slider, VStack } from "native-base";
import AppContext from "../data/createContext";

export default function StrengthSlider(): ReactNode {
  const { setDesiredStrength } = useContext(AppContext);
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setDesiredStrength(value);
  };

  return (
    <VStack space={4} mx={10} width="100%" bg="cyan.50">
      <Text color="gray.700">Strengthometer: {sliderValue * 10}</Text>
      <Slider
        minValue={0}
        maxValue={1}
        value={sliderValue}
        step={0.1}
        onChange={(value) => handleSliderChange(value)}
        colorScheme="amber"
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </VStack>
  );
}
