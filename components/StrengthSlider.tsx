import React, { useState } from "react";
import { Text, Layout } from "@ui-kitten/components";
import { PropTypes } from "prop-types";

import Slider from "@react-native-community/slider";
import { StyleSheet } from "react-native";

export default function StrengthSlider({ handleChildSliderChange }) {
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    handleChildSliderChange(value);
  };

  return (
    <Layout style={styles.container}>
      <Text>Strengthometer: {sliderValue * 10}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        step={0.1}
        onValueChange={(value) => handleSliderChange(value)}
      />
    </Layout>
  );
}

StrengthSlider.propTypes = {
  handleChildSliderChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    width: "100%",
  },
});
