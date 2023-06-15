import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

declare global {
  interface Window {
    updateApp: () => void;
  }
}

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
    console.log('A new version is available. Do you want to update?');
  },
  onOfflineReady() {
    // show a ready to work offline to user
    console.log('The app is ready to work offline.');
  },
})

// Attach the updateSW function to some global scope that
// you can access from anywhere in your app. For example, to the window object.
window.updateApp = updateSW;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
