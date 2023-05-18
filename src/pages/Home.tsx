import React from "react";
import { Box, Paper } from "@mui/material";

import { RootState } from "src/redux/store";
import TodoList from "src/components/todo/TodoList";
import Layout from "src/components/Layout";
import { useAppSelector } from "src/redux/hooks";
import Todo from "src/components/todo/Todo";

function Home() {
  const accessToken = useAppSelector((rootState) => rootState.auth.accessToken);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {accessToken && <Todo />}
      </Box>
    </Layout>
  );
}

export default Home;
