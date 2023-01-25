import { useEffect, memo } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import Card from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import { filter } from "lodash";
import { useInputValue } from "../../hooks/useInputValue";
import emptyTodos from "./assets/empty_todos.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  fetchTodos,
  selectTodoItems,
  selectTodoAddStatus,
} from "../../store/todoSlice";
import TodoList from "./TodoList";

const TodoListMemoized = memo(TodoList);

const UserTasks = () => {
  const dispatch = useDispatch();

  const newTodo = useInputValue("");

  const items = useSelector(selectTodoItems);
  const addLoading = useSelector(selectTodoAddStatus) === "loading";

  useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTodo = () => {
    // Send to redux
    dispatch(addTodo({ userId: 1, title: newTodo.value, completed: false }));
    // Clear txt input
    newTodo.onChange("");
  };

  const renderInputTodo = (
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
                    {addLoading === "loading" && (
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

  // const renderTodoList = useMemo(() => {
  //   const onToggle = (todoId, value) => {
  //     dispatch(updateTodo({ todoId, values: { completed: value } }));
  //   };

  //   const onEdit = (todoId, value) => {
  //     dispatch(updateTodo({ todoId, values: { title: value } }));
  //   };

  //   const onRemove = (todoId) => {
  //     dispatch(deleteTodo(todoId));
  //   };

  //   return (
  //     <List sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
  //       {items.map((todo, index) => {
  //         const labelId = `checkbox-list-label-${todo.id}`;
  //         return (
  //           <ListItem key={`${todo.id} ${index}`} role={undefined} dense>
  //             <ListItemIcon>
  //               <Checkbox
  //                 onChange={(e) => onToggle(todo.id, e.target.checked)}
  //                 edge="start"
  //                 defaultChecked={todo.completed}
  //                 tabIndex={-1}
  //                 inputProps={{ "aria-labelledby": labelId }}
  //               />
  //             </ListItemIcon>
  //             <Input
  //               id={labelId}
  //               onBlur={(e) => onEdit(todo.id, e.target.value)}
  //               defaultValue={todo.title}
  //               sx={{
  //                 padding: 2.5,
  //                 width: "100%",
  //                 "&:before": {
  //                   borderBottom: 0,
  //                 },
  //                 textDecoration: todo.completed ? "line-through" : undefined,
  //               }}
  //               placeholder="Editar item.."
  //               inputProps={{ "aria-label": "description" }}
  //             />
  //             <ListItemSecondaryAction>
  //               <Tooltip title="Excluir">
  //                 <IconButton
  //                   edge="end"
  //                   onClick={() => onRemove(todo.id)}
  //                   aria-label="delete"
  //                 >
  //                   <DeleteIcon color="error" />
  //                 </IconButton>
  //               </Tooltip>
  //             </ListItemSecondaryAction>
  //           </ListItem>
  //         );
  //       })}
  //     </List>
  //   );
  // }, [items, dispatch]);

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
        Itens concluídos:&nbsp;
        {completedTodos.length}
      </p>
    );
  };

  return (
    <Card sx={{ width: "100%", padding: 0, marginBottom: 2 }}>
      {renderInputTodo}

      {items && items.length < 1 ? (
        renderEmptyTodos()
      ) : (
        <TodoListMemoized items={items} />
      )}

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
            Total:&nbsp;
            {items.length}
          </p>
        </Box>
      )}
    </Card>
  );
};

export default UserTasks;
