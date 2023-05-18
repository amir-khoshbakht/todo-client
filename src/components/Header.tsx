import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Theme,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

import { RootState } from "src/redux/store";
import { removeToken } from "src/redux/services/authSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export default function Header() {
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginClick = (event: React.MouseEvent) => {
    navigate("/auth/login");
  };
  const handleLogoutClick = (event: React.MouseEvent) => {
    const a = dispatch(removeToken());
    console.log(a);
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: (theme: Theme) => theme.palette.grey[300],
        margin: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          marginX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: 2,
          }}
        >
          <Typography
            sx={{ margin: 1, whiteSpace: "nowrap" }}
            variant="h6"
            component="h1"
          >
            Todo client
          </Typography>
          <Chip
            sx={{ p: 1 }}
            {...(accessToken
              ? {
                  label: "Sign out",
                  icon: <LogoutIcon />,
                  onClick: handleLogoutClick,
                }
              : {
                  label: "Sign in",
                  icon: <LoginIcon />,
                  onClick: handleLoginClick,
                })}
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
}
