import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#5A6000",
        background: "#dddecd",
        soft: "#8B9400",
        softHover: "#676e01",
        inactive: "#5A6000",
      },
      secondary: {
        main: "#548A00",
        hover: "#49681A",
        inactive: "#365A00",
        text: "#2a2a2a",
      },
      error: {
        main: "#931F1D",
        hover: "#721916",
        inactive: "rgba(114,25,22,0.46)",
      },
    },
    typography: {
      allVariants: {
        color: "#1e1e1e",
        fontFamily: '"Helvetica", sans-serif',
        whiteSpace: "pre-line",
      },
    },
    components: {},
  })
);

export default theme;
