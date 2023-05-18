import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Input, Paper } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-toastify";

import { useAppSelector } from "src/redux/hooks";
import { useAddTodoMutation, useGetAllQuery } from "src/redux/services/todoApi";
import TodoList from "./TodoList";

function Todo() {
  const { data: todos, isError, error: errorGetAll } = useGetAllQuery();
  const [addTodo] = useAddTodoMutation();

  const [todoText, setTodoText] = useState("");

  if (errorGetAll) toast.error("error while fetching todo list");

  const handleAddTodo = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addTodo(todoText);
    setTodoText("");
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          minWidth: 480,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minHeight: "300px",
          top: "90px",
          padding: 2,
        }}
      >
        <Box component="form" sx={{ display: "flex" }}>
          <Input
            sx={{ flexGrow: 1 }}
            placeholder="Todo text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            inputProps={{ "aria-label": "the title of the todo" }}
          />
          <IconButton
            type="submit"
            onClick={handleAddTodo}
            sx={{ marginRight: 0.5 }}
          >
            <AddBoxIcon />
          </IconButton>
        </Box>
        <Box>
          {isError && "error while fetching todo list"}
          {todos && <TodoList todos={todos} />}
        </Box>
      </Paper>
    </>
  );
}

export default Todo;
