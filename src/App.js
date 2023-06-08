import React, { useState } from 'react';
import emailValidator from 'email-validator';
import { TextField, Button } from '@mui/material';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorEmail(false);
    setErrorPassword(false);
    setSuccessMessage('');

    if (!emailValidator.validate(email)) {
      setErrorEmail(true);
    } else if (!validatePassword(password)) {
      setErrorPassword(true);
    } else {
      setSuccessMessage('Login successful');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <div className="success">{successMessage}</div>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errorEmail}
        helperText={errorEmail ? 'Invalid email address' : ''}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errorPassword}
        helperText={errorPassword ? 'Invalid password' : ''}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

