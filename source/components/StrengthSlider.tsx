import React, { ReactNode, useContext } from "react";
import { Box, Fab } from "native-base";
import { theme } from "../theme";
import AppContext from "../store/createContext";

// TODO: Change to hovering buttons
/*
  - +/- buttons
  - float bottom right
  - tea icon fade in and out
  - show strength on change
  - show strength on tea icon click
*/

export default function StrengthSlider(): ReactNode {
  const { desiredStrength, setDesiredStrength } = useContext(AppContext);

  const incrementStrength = () => {
    if (Math.round(desiredStrength * 10) >= 10) {
      return;
    }
    setDesiredStrength(desiredStrength + Math.round(0.1 * 10) / 10);
  };

  const decrementStrength = () => {
    if (Math.round(desiredStrength * 10) <= 1) {
      return;
    }
    setDesiredStrength(desiredStrength - Math.round(0.1 * 10) / 10);
  };

  return (
    <Box position="relative" w="100%">
      <Fab size={10} bottom={172} label="+" onPress={incrementStrength} />
      <Fab
        size={10}
        bottom={116}
        bgColor={theme.other.white}
        label={Math.round(desiredStrength * 10)}
      />
      <Fab bottom={60} size={10} label="-" onPress={decrementStrength} />
    </Box>
  );
}
