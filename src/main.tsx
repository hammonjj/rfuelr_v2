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

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW();
    //window.location.reload();
    console.log('A new version is available');
  },
  onOfflineReady() {
    console.log('App ready to work offline.');
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
