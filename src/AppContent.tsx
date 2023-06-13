import { Session } from "@supabase/supabase-js";
import SettingsContext from "./contexts/SettingsContext";
import { useContext } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoggedInNavigationBar from "./components/LoggedInNavigationBar";
import { Login } from "@mui/icons-material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
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
        <CssBaseline />
          {session ? <LoggedInNavigationBar /> : <Login />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default AppContent