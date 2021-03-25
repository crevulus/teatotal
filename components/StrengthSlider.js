import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import Slider from "@react-native-community/slider";

import AppStyles from "../AppStyles";

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
        minimumTrackTintColor={AppStyles.colour.primary}
        thumbTintColor={AppStyles.colour.secondary}
        value={sliderValue}
        step={0.1}
        onValueChange={(value) => handleSliderChange(value)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
