import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#ecf1fe",
      100: "#cdd5e6",
      200: "#aeb9d1",
      300: "#8e9dbd",
      400: "#6f81aa",
      500: "#556890",
      600: "#425171",
      700: "#2e3a51",
      800: "#1b2333",
      900: "#030d17",
    },
    secondary: {
      50: "#fff7dd",
      100: "#f9e6b5",
      200: "#f2d58a",
      300: "#ecc55e",
      400: "#e6b432",
      500: "#cd9b19",
      600: "#9f7810",
      700: "#725609",
      800: "#453401",
      900: "#1b1000",
    },
    amber: {
      400: "#d97706",
    },
  },
  config: {
    initialColorMode: "dark",
  },
});

export default theme;
