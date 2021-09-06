import React, { ReactNode, useContext, useState } from "react";
import { Text, Slider, View } from "native-base";
import AppContext from "../data/createContext";

export default function StrengthSlider(): ReactNode {
  const { setDesiredStrength } = useContext(AppContext);
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setDesiredStrength(value);
  };

  return (
    <View maxWidth="80%">
      <Text>Strengthometer: {sliderValue * 10}</Text>
      <Slider
        minValue={0}
        maxValue={1}
        value={sliderValue}
        step={0.1}
        onChange={(value) => handleSliderChange(value)}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </View>
  );
}
