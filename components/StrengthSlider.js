import React, { useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { PropTypes } from "prop-types";

import Slider from "@react-native-community/slider";

export default function StrengthSlider({ handleChildSliderChange }) {
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    handleChildSliderChange(value);
  };

  return (
    <SafeAreaView>
      <Text>Strengthometer: {sliderValue * 10}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        step={0.1}
        onValueChange={(value) => handleSliderChange(value)}
      />
    </SafeAreaView>
  );
}

StrengthSlider.propTypes = {
  handleChildSliderChange: PropTypes.func,
};
