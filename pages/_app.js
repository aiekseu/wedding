import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import UserGlobalStyles from "../styles/global-styles";
import createEmotionCache from "../styles/emotion-cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserGlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
