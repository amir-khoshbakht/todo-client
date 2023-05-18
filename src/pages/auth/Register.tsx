import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRegisterMutation } from "src/redux/services/authApi";
import AuthLayout from "./AuthLayout";
import { setToken } from "src/redux/services/authSlice";
import {
  isErrorWithBodyMessage,
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "src/redux/helpers";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((rootState) => rootState.auth.accessToken);
  const [register, { isLoading }] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToHomePage = () => {
    navigate("/");
  };

  const handleGotoLoginPage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/auth/login");
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) return toast.info("Loading...", { autoClose: 2222 });

    try {
      const accessToken = await register({ username, password }).unwrap();
      const a = dispatch(setToken(accessToken));
      console.log(a);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = isErrorWithBodyMessage(err)
          ? err.data.error
          : "unknown error.";
        toast.error(errMsg);
      } else if (isErrorWithMessage(err)) {
        toast.error(err.message);
      } else {
        toast.error("unknown error");
      }
    }
  };

  useEffect(() => {
    if (accessToken) goToHomePage();
  });

  return (
    <AuthLayout>
      <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            component="h1"
            sx={{
              cursor: "pointer",
            }}
            variant="h5"
            gutterBottom
            onClick={goToHomePage}
          >
            Register
          </Typography>
        </Box>

        <Box sx={{ width: 350 }}>
          <Box
            component="form"
            method="post"
            onSubmit={handleRegister}
            sx={{
              display: "inline-flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              onChange={(event) => setUsername(event.target.value)}
              margin="normal"
              label="username"
              required
              value={username}
            />

            <TextField
              fullWidth
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              id="login-password-input"
              label="password"
              required
              value={password}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
              Register
            </Button>

            <Button type="button" onClick={handleGotoLoginPage}>
              already registered
            </Button>
          </Box>
        </Box>
      </>
    </AuthLayout>
  );
}

export default Register;
