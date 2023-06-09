import { Button } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

export default function Settings() {
    async function signOut() {
      supabase.auth.signOut();
    }

    return (
      <div>
          <Button variant="contained" onClick={signOut}>Log Out</Button>
      </div>
    );
}