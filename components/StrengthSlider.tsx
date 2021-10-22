import React, { ReactNode } from "react";
import { Box, Fab } from "native-base";
import { useTeaSettingsContext } from "../store/createContext.ts";
import { theme } from "../theme";
import { TeaSettingsActions } from "../store/TeaSettingsContext";

// TODO: Change to hovering buttons
/*
  - +/- buttons
  - float bottom right
  - tea icon fade in and out
  - show strength on change
  - show strength on tea icon click
*/

export default function StrengthSlider(): ReactNode {
  const { state, dispatch } = useTeaSettingsContext();
  console.log(state);

  const incrementStrength = () => {
    if (Math.round(state.desiredStrength * 10) >= 10) {
      return;
    }
    dispatch({
      payload: state.desiredStrength + Math.round(0.1 * 10) / 10,
      type: TeaSettingsActions.ChangeStrength,
    });
  };

  const decrementStrength = () => {
    if (Math.round(state.desiredStrength * 10) <= 1) {
      return;
    }
    dispatch({
      payload: state.desiredStrength - Math.round(0.1 * 10) / 10,
      type: TeaSettingsActions.ChangeStrength,
    });
  };

  return (
    <Box position="relative" w="100%">
      <Fab size={10} bottom={172} label="+" onPress={incrementStrength} />
      <Fab
        size={10}
        bottom={116}
        bgColor={theme.other.white}
        label={Math.round(state.desiredStrength * 10)}
      />
      <Fab bottom={60} size={10} label="-" onPress={decrementStrength} />
    </Box>
  );
}
