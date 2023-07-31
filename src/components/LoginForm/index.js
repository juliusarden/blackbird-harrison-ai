import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';

export default function LoginForm() {
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    let isValid = true;

    // Perform basic form validation
    if (email === '') {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password === '') {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }



    // Perform password validation
    if (isValid) {
      // Check password length
      if (password.length < 8) {
        setErrorMessage('Password must be a minimum of 8 characters.');
        setPasswordError(true);
        isValid = false;
      }
      // Check if password contains both uppercase and lowercase letters
      else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        setErrorMessage('Password must contain both uppercase and lowercase letters.');
        setPasswordError(true);
        isValid = false;
      }
      // Check if password contains at least one numerical digit
      else if (!/\d/.test(password)) {
        setErrorMessage('Password must contain at least one numerical digit.');
        setPasswordError(true);
        isValid = false;
      }
      // Check if password contains at least one special character
      else if (!/[!@#$%^&*()\-_=+[\]{};:'"\\|,.<>/?]/.test(password)) {
        setErrorMessage('Password must contain at least one special character.');
        setPasswordError(true);
        isValid = false;
      } else {
        setErrorMessage('');
        setPasswordError(false);
      }
    }

    return isValid;
  };


  

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.log({
        email,
        password,
      });

      setShowSuccessSnackbar(true);
    }
  };

  const handleSuccessSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSuccessSnackbarClose}
        message="Login Successful"
      />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ my: 2 }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
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
              error={passwordError}
              helperText={passwordError && errorMessage}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
