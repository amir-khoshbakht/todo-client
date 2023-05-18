import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Todo,
  useRemoveTodoMutation,
  useToggleTodoMutation,
} from "src/redux/services/todoApi";
import { Theme } from "@mui/material";
import { toast } from "react-toastify";

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [toggleTodo, { error: errorToggle }] = useToggleTodoMutation();
  const [removeTodo, { error: errorRemove }] = useRemoveTodoMutation();

  if (errorToggle) toast.error("error toggling Todo status");
  if (errorRemove) toast.error("error removing Todo status");

  return (
    <List>
      {todos.map((todo: Todo) => {
        const { id: todoId, text, is_done } = todo;
        const labelId = `checkbox-list-label-${todoId}`;
        return (
          <ListItem
            sx={{ background: (theme: Theme) => theme.palette.grey[50] }}
            key={todoId}
            secondaryAction={
              <IconButton
                onClick={() => removeTodo(todoId)}
                edge="end"
                aria-label="remove"
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => toggleTodo(todoId)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={is_done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
