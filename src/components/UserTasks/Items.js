import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../store/todoSlice";

const Items = ({ items }) => {
  const dispatch = useDispatch();

  const onToggle = (todoId, value) => {
    dispatch(
      editTodo({
        todoId,
        completed: value,
      })
    );
  };

  const onEdit = (todoId, value) => {
    dispatch(
      editTodo({
        todoId,
        title: value,
      })
    );
  };

  const onRemove = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <List sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
      {items.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        return (
          <ListItem key={todo.id} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                onChange={() => onToggle(todo.id, !todo.completed)}
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <Input
              id={labelId}
              value={todo.title}
              sx={{
                padding: 2.5,
                width: "100%",
                "&:before": {
                  borderBottom: 0,
                },
                textDecoration: todo.completed ? "line-through" : undefined,
              }}
              onChange={(evt) => {
                onEdit(todo.id, evt.target.value);
              }}
              placeholder="Edit todo item.."
              inputProps={{ "aria-label": "description" }}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  onClick={() => onRemove(todo.id)}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Items;
