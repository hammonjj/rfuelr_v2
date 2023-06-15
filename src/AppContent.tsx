import { Session } from "@supabase/supabase-js";
import SettingsContext from "./contexts/SettingsContext";
import { useContext } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoggedInNavigationBar from "./components/LoggedInNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "@pages/Login";
import { ToastProvider } from "@contexts/ToastProvider";
import Toast from "@components/Toast";

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
            {session ? <LoggedInNavigationBar /> : <Login />}
          <ReactQueryDevtools initialIsOpen={false} />
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default AppContent