import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLoginMutation } from "src/redux/services/authApi";
import AuthLayout from "./AuthLayout";
import { RootState } from "src/redux/store";
import { setToken } from "src/redux/services/authSlice";
import {
  isErrorWithBodyMessage,
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "src/redux/helpers";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const goToHomePage = () => {
    navigate("/");
  };

  const handleGotoRegisterPage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/auth/register");
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) return toast.info("Loading...", { autoClose: 2222 });

    try {
      const accessToken = await login({ username, password }).unwrap();
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
            Login
          </Typography>
        </Box>

        <Box sx={{ width: 350 }}>
          <Box component="form" method="post" onSubmit={handleLogin}>
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

            <Box
              sx={{
                width: "auto",
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Button type="button" onClick={handleGotoRegisterPage}>
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </AuthLayout>
  );
}

export default Login;
