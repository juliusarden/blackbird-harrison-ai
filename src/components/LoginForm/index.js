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
import EmailValidator from 'email-validator';
import { TextField } from '@material-ui/core';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const Email = data.get('email');
    const Password = data.get('password');

    // Add validation code here
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    // validation function
    const validate = () => {
      let emailError = "";
      let passwordError = "";
      
      if (!EmailValidator.validate(email)) {
        emailError = "Invalid email address";
      }
    
      if (password.length < 8) {
        passwordError = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        passwordError = "Password must contain both uppercase and lowercase letters";
      } else if (!/\d/.test(password)) {
        passwordError = "Password must contain at least one numerical digit (0-9)";
      } else if (!/[!@#$%^&*]/.test(password)) {
        passwordError = "Password must contain at least one special character (!@#$%^&*)";
      }
    
      if (emailError || passwordError) {
        setEmailError(emailError);
        setPasswordError(passwordError);
        return false;
      }
    
      return true;
    };
    


  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    validateForm(event);
    setShowAlert("Login Successful");
  };
  const HandleSubmit = () => {
    if (validate()) {
      // Show success snackbar
    }
  };
  
  <Button onClick={handleSubmit}>Submit</Button>
  

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
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
          <Box sx={{
            my: 2
          }}>
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
      <TextField
  id="email"
  label="Email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  helperText={emailError}
  error={Boolean(emailError)}
  fullWidth
/>

<TextField
  id="password"
  label="Password"
  type="password"
  value={password}
  onChange={e => setPassword(e.target.value)}
  helperText={passwordError}
  error={Boolean(passwordError)}
  fullWidth
/>

    </>
  );
}
