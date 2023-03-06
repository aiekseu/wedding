import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import UserGlobalStyles from "../styles/global-styles";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserGlobalStyles />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
