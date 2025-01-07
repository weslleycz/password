import { Theme } from "@react-native-material/core";

const primary = "#5bfcc6";
const secondary = "#E1F5EB";

const theme: Theme = {
  colorScheme: "light",
  elevations: {
    0: { elevation: 0 },
    1: { elevation: 1 },
    2: { elevation: 2 },
    3: { elevation: 3 },
    4: { elevation: 4 },
    5: { elevation: 5 },
    6: { elevation: 6 },
    7: { elevation: 7 },
    8: { elevation: 8 },
    9: { elevation: 9 },
    10: { elevation: 10 },
    11: { elevation: 11 },
    12: { elevation: 12 },
    13: { elevation: 13 },
    14: { elevation: 14 },
    15: { elevation: 15 },
    16: { elevation: 16 },
    17: { elevation: 17 },
    18: { elevation: 18 },
    19: { elevation: 19 },
    20: { elevation: 20 },
    21: { elevation: 21 },
    22: { elevation: 22 },
    23: { elevation: 23 },
    24: { elevation: 24 },
  },
  palette: {
    primary: { main: primary, on: "#ffffff" },
    secondary: { main: secondary, on: "#000000" },
    background: { main: "#ffffff", on: "#000000" },
    surface: { main: "#ffffff", on: "#000000" },
    error: { main: "#fd1741", on: "#ffffff" },
  },
  shapes: {
    small: {
      borderTopStartRadius: 4,
      borderTopEndRadius: 4,
      borderBottomStartRadius: 4,
      borderBottomEndRadius: 4,
    },
    medium: {
      borderTopStartRadius: 8,
      borderTopEndRadius: 8,
      borderBottomStartRadius: 8,
      borderBottomEndRadius: 8,
    },
    large: {
      borderTopStartRadius: 16,
      borderTopEndRadius: 16,
      borderBottomStartRadius: 16,
      borderBottomEndRadius: 16,
    },
  },
  typography: {
    h1: { fontSize: 32, fontWeight: "bold" },
    h2: { fontSize: 28, fontWeight: "bold" },
    h3: { fontSize: 24, fontWeight: "bold" },
    h4: { fontSize: 20, fontWeight: "bold" },
    h5: { fontSize: 16, fontWeight: "bold" },
    h6: { fontSize: 14, fontWeight: "bold" },
    subtitle1: { fontSize: 16, fontWeight: "normal" },
    subtitle2: { fontSize: 14, fontWeight: "normal" },
    body1: { fontSize: 16, fontWeight: "normal" },
    body2: { fontSize: 14, fontWeight: "normal" },
    button: {
      fontSize: 14,
      fontWeight: "bold",
      cursor: "pointer",
    },
    caption: { fontSize: 12, fontWeight: "normal" },
    overline: { fontSize: 10, fontWeight: "normal" },
  },
};

export { theme, primary, secondary };
