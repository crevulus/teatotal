import React, { ReactNode, useContext, useState } from "react";
import { Box, Fab } from "native-base";
import AppContext from "../data/createContext";

// TODO: Change to hovering buttons
/*
  - +/- buttons
  - float bottom right
  - tea icon fade in and out
  - show strength on change
  - show strength on tea icon click
*/

export default function StrengthSlider(): ReactNode {
  const { setDesiredStrength } = useContext(AppContext);
  const [sliderValue, setSliderValue] = useState(0.5);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setDesiredStrength(value);
  };

  return (
    <Box position="relative" w="100%">
      <Fab bottom={112}>+</Fab>
      <Fab bottom={16}>Tea</Fab>
      <Fab>-</Fab>
    </Box>
  );
}
