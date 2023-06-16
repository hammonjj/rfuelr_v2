import { Session } from "@supabase/supabase-js";
import SettingsContext from "./contexts/SettingsContext";
import { useContext, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoggedInNavigationBar from "./components/LoggedInNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "@contexts/ToastProvider";
import Toast from "@components/Toast";
import { registerSW } from "virtual:pwa-register";
import LoggedOutNavigationBar from "@components/LoggedOutNavigationBar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      staleTime: 600000,
    },
  }
});

interface AppContentProps {
  session: Session | null;
}

const AppContent: React.FC<AppContentProps> = ({ session }) => {
  const { darkMode } = useContext(SettingsContext);

  useEffect(() => {
    // The onNeedRefresh function should be set somewhere at a higher level in the
    // component hierarchy, or in a context. Here it's done in an effect for simplicity.
    registerSW({
      onNeedRefresh: () => {
        // A new version of the service worker is available
        window.updateApp?.();
      },
      onOfflineReady: () => {
        // The app is ready to work offline
      },
    });
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <CssBaseline />
          <Toast />
            {session ? <LoggedInNavigationBar /> : <LoggedOutNavigationBar />}
          <ReactQueryDevtools initialIsOpen={false} />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default AppContent