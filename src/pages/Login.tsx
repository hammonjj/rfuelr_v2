import { useEffect, useState } from 'react';
import { supabase } from '@utils/supabaseClient';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import useToast from '@hooks/useToast';
import ForgotPasswordDialog from '@components/Dialogs/ForgotPasswordDialog';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginButtonEnabled, setLoginButtonEnabled] = useState(true);

    const { showError } = useToast();
    const [openPasswordResetDialog, setOpenPasswordResetDialog] = useState(false);

    function handleClosePasswordResetDialog() {
      setOpenPasswordResetDialog(false);
    }

    useEffect(() => {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');

      if (storedEmail && storedPassword) {
        setRememberMe(true);
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    }, []);
    
    async function signInWithEmail(event: { preventDefault: () => void; }) {
      event.preventDefault();
        setLoginButtonEnabled(false);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if(error) {
          showError("Error: Invalid username or password");
        }
        
        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        setLoginButtonEnabled(true);
    }

    return (
      <Container component="main" maxWidth="sm">
        <ForgotPasswordDialog open={openPasswordResetDialog} handleClose={handleClosePasswordResetDialog}/>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={signInWithEmail} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              inputProps={{
                autoCapitalize: 'none',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  value={rememberMe} 
                  color="primary" 
                  onChange={(e) => setRememberMe(e.target.checked)}/>}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!loginButtonEnabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" href="#" onClick={() => { 
                  setOpenPasswordResetDialog(true);
                }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}