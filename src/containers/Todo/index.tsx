import { Box, CircularProgress, List, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { TodoQueryFilter } from "../../api/todos/api";
import { useAppSelector } from "../../app/configs/redux/hooks";
import { selectForceUser } from "../../app/configs/redux/slices/appSlice";
import useTodoQuery from "../../app/hooks/useTodoQuery";
import ControlPanel from "./ControlPanel";
import TodoListItem from "./TodoListItem";
import { TodoFilter } from "./types";

const toggleAscDesc = (dir: "asc" | "desc"): "asc" | "desc" => {
  if (dir === "asc") return "desc";
  if (dir === "desc") return "asc";
  return "asc";
};

type TodoContainerProps = {};

const TodoContainer: FC<TodoContainerProps> = () => {
  const user = useAppSelector(selectForceUser);

  const [queryFilter, setQueryFilter] = useState<TodoQueryFilter>({
    field: "createdAt",
    direction: "desc",
  });

  const {
    data: todos = [],
    isLoading,
    error,
  } = useTodoQuery(user.id, queryFilter);

  const [filter, setFilter] = useState<TodoFilter>({ completed: null });

  const filteredTodos =
    filter.completed === null
      ? todos
      : todos.filter((todo) => todo.completed === filter.completed);

  const toggleFilterTodo = () => {
    if (filter.completed !== false) {
      setFilter({ completed: false });
    } else {
      // reset to null
      setFilter({ completed: null });
    }
  };

  const toggleFilterCompleted = () => {
    if (filter.completed !== true) {
      setFilter({ completed: true });
    } else {
      // reset to null
      setFilter({ completed: null });
    }
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const sortText = () => {
    setQueryFilter((old) => ({
      direction: toggleAscDesc(old.direction),
      field: "text",
    }));
  };

  const sortDate = () => {
    setQueryFilter((old) => ({
      direction: toggleAscDesc(old.direction),
      field: "createdAt",
    }));
  };

  return (
    <Box maxWidth={400} margin="auto">
      <Box padding={4}>
        <Typography variant="h6" align="center">
          My first React Simple Todo
        </Typography>
      </Box>

      <Stack gap={2}>
        <ControlPanel
          filter={filter}
          queryFilter={queryFilter}
          onToggleFilterTodo={toggleFilterTodo}
          onToggleFilterCompleted={toggleFilterCompleted}
          sortText={sortText}
          sortDate={sortDate}
        />

        {isLoading ? (
          <Stack alignItems="center" gap={1}>
            <CircularProgress />

            <Typography color="GrayText">
              Loading todos form firestore...
            </Typography>
          </Stack>
        ) : (
          <List
            subheader={
              <Typography>{`${filteredTodos.length} todos`}</Typography>
            }
          >
            {filteredTodos.map((todo, i) => (
              <TodoListItem key={`todo-item-${todo.id}`} todo={todo} />
            ))}
          </List>
        )}
      </Stack>
    </Box>
  );
};

export default TodoContainer;
