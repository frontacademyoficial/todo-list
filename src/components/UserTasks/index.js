import { useState } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import { filter } from "lodash";
import { useInputValue } from "../../hooks/useInputValue";
import emptyTodos from "./assets/empty_todos.svg";

const UserTasks = () => {
  const newTodo = useInputValue("");
  const [addLoading, setLoading] = useState(false);

  const items = [
    { id: 1, completed: false, text: "TODO 1" },
    { id: 2, completed: true, text: "TODO 2" },
  ];

  const handleAddTodo = () => {
    setLoading(true);
    // Send to redux
    console.log("handleAddTodo", newTodo.value);
    // Clear txt input
    newTodo.onChange("");
  };

  const renderInputTodo = () => (
    <List component="nav" aria-label="main add-todo field">
      <Input
        {...newTodo}
        sx={{
          padding: 2.5,
          width: "100%",
        }}
        onKeyPress={(event) => event.key === "Enter" && handleAddTodo()}
        placeholder="Adicione uma nova tarefa..."
        inputProps={{ "aria-label": "description" }}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Salvar tarefa">
              <span>
                <IconButton
                  aria-label="Salvar tarefa"
                  onClick={handleAddTodo}
                  disabled={newTodo.value.length < 2}
                >
                  <Box margin={1} position="relative">
                    <SendIcon
                      color={newTodo.value.length < 2 ? "disabled" : "primary"}
                    />
                    {addLoading && (
                      <CircularProgress
                        size={44}
                        sx={{
                          position: "absolute",
                          top: -10,
                          left: -15,
                          zIndex: 10,
                        }}
                      />
                    )}
                  </Box>
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        }
      />
    </List>
  );

  const renderEmptyTodos = () => (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom={4}
    >
      <img width="50%" src={emptyTodos} alt="don't have todos" />
      <h1>Você não tem tarefas</h1>
      <p style={{ color: "#999999" }}>Aqui você verá as tarefas criadas</p>
    </Box>
  );

  const onToggle = (todoId, field, value) => {
    console.log("onToggle", todoId, field, value);
  };

  const onEdit = (todo, value) => {
    console.log("onEdit", todo, value);
  };

  const onRemove = (todoId) => {
    console.log("onRemove", todoId);
  };

  const renderTodoList = () => (
    <List sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
      {items.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        return (
          <ListItem key={todo.id} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                onClick={onToggle(todo.id, "completed", !todo.completed)}
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <Input
              id={labelId}
              value={todo.text}
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

  const renderCompletedTodos = () => {
    const completedTodos = filter(items, "completed");
    return (
      <p
        style={{
          paddingLeft: 10,
          marginRight: 6,
          color: "#999999",
          textAlign: "start",
        }}
      >
        Completed items:&nbsp;
        {completedTodos.length}
      </p>
    );
  };

  return (
    <Card sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
      {renderInputTodo()}

      {items && items.length < 1 ? renderEmptyTodos() : renderTodoList()}

      {items.length > 0 && (
        <Box display="flex">
          {renderCompletedTodos()}
          <p
            style={{
              paddingLeft: 10,
              marginRight: 6,
              color: "#999999",
              textAlign: "start",
            }}
          >
            Total items:&nbsp;
            {items.length}
          </p>
        </Box>
      )}
    </Card>
  );
};

export default UserTasks;
