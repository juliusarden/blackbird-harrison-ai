import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import validator from 'email-validator';

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);

  // NEW: error states for email and password
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (email, password) => {
    let isValid = true;

    // Validate Email
    if (!validator.validate(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate Password - Rule 1: Minimum 8 characters
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      isValid = false;
    }
    // Validate Password - Rule 2: Must have uppercase
    else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      isValid = false;
    }
    // Validate Password - Rule 3: Must have lowercase
    else if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      isValid = false;
    }
    // Validate Password - Rule 4: Must have a number
    else if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number.');
      isValid = false;
    }
    // Validate Password - Rule 5: Must have special character
    else if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one special character (!@#$%^&*).');
      isValid = false;
    }
    else {
      setPasswordError('');
    }

    return isValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Only show success if validation passes
    const isValid = validateForm(email, password);
    if (isValid) {
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert severity="success">{showAlert}</Alert>
        </Snackbar>
      }
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

            {/* Email Field - now has error and helperText */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />

            {/* Password Field - now has error and helperText */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
              helperText={passwordError}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}