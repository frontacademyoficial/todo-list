import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import { deleteTodo, updateTodo } from "../../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoList = ({ items }) => {
  console.log("render TodoList");
  const dispatch = useDispatch();

  const onToggle = (todoId, value) => {
    dispatch(updateTodo({ todoId, values: { completed: value } }));
  };

  const onEdit = (todoId, value) => {
    dispatch(updateTodo({ todoId, values: { title: value } }));
  };

  const onRemove = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <List sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
      {items.map((todo, index) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        return (
          <ListItem key={`${todo.id} ${index}`} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                onChange={(e) => onToggle(todo.id, e.target.checked)}
                edge="start"
                defaultChecked={todo.completed}
                tabIndex={-1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <Input
              id={labelId}
              onBlur={(e) => onEdit(todo.id, e.target.value)}
              defaultValue={todo.title}
              sx={{
                padding: 2.5,
                width: "100%",
                "&:before": {
                  borderBottom: 0,
                },
                textDecoration: todo.completed ? "line-through" : undefined,
              }}
              placeholder="Editar item.."
              inputProps={{ "aria-label": "description" }}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Excluir">
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

export default TodoList;
