import { useEffect } from 'react'
import { registerSW } from "virtual:pwa-register";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingsProvider from '@contexts/SettingsProvider';
import ChangePassword from '@pages/ChangePassword';
import AppContent from './AppContent';
import Layout from '@pages/Layout';
import ValidateAccount from '@pages/ValidateAccount';

function App() {
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

  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<AppContent />} />
            <Route path="change-password" element={<ChangePassword />}/>
            <Route path="validate-account" element={<ValidateAccount />} />
          </Route>
        </Routes>
      </Router>
    </SettingsProvider>
  )
}

export default App
