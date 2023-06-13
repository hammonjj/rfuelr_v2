import { useEffect, useState } from 'react'
import { supabase } from './utils/supabaseClient';
import { Session } from '@supabase/supabase-js';
import SettingsProvider from './contexts/SettingsProvider';
import AppContent from './AppContent';

function App() {
  const [session, setSession] = useState<Session | null>(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SettingsProvider>
      <AppContent session={session} />
    </SettingsProvider>
  )
}

export default App
