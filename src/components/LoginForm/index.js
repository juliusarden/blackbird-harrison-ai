import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";
import * as EmailValidator from "email-validator";

export default function LoginForm() {
    const [showAlert, setShowAlert] = useState(false);
    const [displayMessage, setDIsplayMessage] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [wasTouched, setWasTouched] = useState(false);

    const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const wasTouchedHandler = () => {
        setWasTouched(true);
    };
    const validateForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        // Add validation code here
        const valid = regEx.test(password);
        if (valid) {
            setPasswordValid(true);
        } else {
            return;
        }

        if (EmailValidator.validate(email)) {
            setEmailValid(true);
        } else {
            return;
        }

        setShowAlert(true);
        setDIsplayMessage("Login successful!");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        validateForm(event);
    };

    return (
        <>
            {showAlert && (
                <Snackbar
                    open={showAlert}
                    autoHideDuration={6000}
                    onClose={() => setShowAlert(false)}
                    message={displayMessage}
                >
                    <Alert>{displayMessage}</Alert>
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
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
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
                            error={!emailValid && wasTouched}
                            helperText={!emailValid && "Enter a valid email"}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onBlur={wasTouchedHandler}
                        />
                        <TextField
                            error={!passwordValid && wasTouched}
                            helperText={
                                !passwordValid && "Enter a valid password"
                            }
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={wasTouchedHandler}
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
