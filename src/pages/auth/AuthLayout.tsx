import React, { ReactElement } from "react";
import { Box, Paper, Theme, Typography } from "@mui/material";

function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ p: 3 }} elevation={4}>
        {children}
      </Paper>
    </Box>
  );
}

export default AuthLayout;
