import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import * as EmailValidator from "email-validator";

import logo from "../../assets/logo.svg";

const hasUpper = (text) => {
  const re = RegExp("[A-Z]+");
  return re.test(text);
};

const hasLower = (text) => {
  const re = RegExp("[a-z]+");
  return re.test(text);
};

const hasNumber = (text) => {
  const re = RegExp("[0-9]+");
  return re.test(text);
};

const hasSpecialCharacter = (text) => {
  const re = new RegExp("[!@#$%^&*]");
  return re.test(text);
};

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  const validateEmail = (email) => {
    if (EmailValidator.validate(email)) {
      return true;
    } else {
      setEmailErrorMsg("Please enter valid email address.");
      return false;
    }
  };

  const validatePassword = (password) => {
    let isValid = true;
    let errorMsg = null;

    if (password.length < 8) {
      errorMsg = "Password should be 8 or more characters.";
      isValid = false;
    } else if (!hasUpper(password) || !hasLower(password)) {
      errorMsg =
        "Password should contains both uppercase and lowercase letter.";
      isValid = false;
    } else if (!hasNumber(password)) {
      errorMsg = "Password should contains minimum 1 digit of numeric value.";
      isValid = false;
    } else if (!hasSpecialCharacter(password)) {
      errorMsg = "Password should contains minimum 1 special character.";
      isValid = false;
    }

    errorMsg && setPasswordErrorMsg(errorMsg);
    return isValid;
  };

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    return isValidEmail && isValidPassword;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    // Show success message when form inputs are valid
    if (validateForm(event)) {
      setEmailErrorMsg(false);
      setPasswordErrorMsg(false);
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              error={!!emailErrorMsg}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={emailErrorMsg}
              autoFocus
            />
            <TextField
              error={!!passwordErrorMsg}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText={passwordErrorMsg}
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
    </>
  );
}
