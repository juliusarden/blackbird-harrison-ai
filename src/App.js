import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import emailValidator from "email-validator";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Validate email
    const isEmailValid = emailValidator.validate(email);

    // Validate password based on requirements
    const isPasswordValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password);

    if (isEmailValid && isPasswordValid) {
      setOpenSnackbar(true);
      setSnackbarMessage("Validation passed!");
    } else {
      setError({
        email: !isEmailValid,
        password: !isPasswordValid,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        error={error.email}
        helperText={error.email ? "Invalid email address" : ""}
      />
      <br />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={error.password}
        helperText={
          error.password
            ? "Invalid password (min 8 characters, uppercase, lowercase, digit, special character)"
            : ""
        }
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
    
