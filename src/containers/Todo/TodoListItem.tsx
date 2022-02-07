// TodoListItem.tsx;

import { DeleteForever } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Todo } from "../../api/todos/model";
import { useAppSelector } from "../../app/configs/redux/hooks";
import { selectForceUser } from "../../app/configs/redux/slices/appSlice";
import useTodo from "../../app/hooks/useTodo";

type TodoListItemProps = {
  todo: Todo;
};

const TodoListItem: FC<TodoListItemProps> = ({
  todo: { id, completed, createdAt, text },
}) => {
  const user = useAppSelector(selectForceUser);
  const { mutateAsync: updateTodo, isLoading: isUpdating } =
    useTodo().updateTodoMtn;
  const { mutateAsync: delTodo, isLoading: isDeleting } = useTodo().delTodoMtn;

  const [done, setDone] = useState(completed);
  useEffect(() => {
    setDone(completed);
  }, [completed]);

  const handleToggleUpdate = () => {
    updateTodo({
      userId: user.id,
      id,
      completed: !done,
    });
    setDone(!done);
  };

  return (
    <ListItem
      disabled={isUpdating}
      dense
      button
      onClick={handleToggleUpdate}
      disableRipple
    >
      <ListItemIcon>
        <Checkbox
          disabled={isUpdating}
          edge="start"
          defaultChecked={done}
          checked={done}
          onChange={handleToggleUpdate}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        // primary={
        //   <Typography
        //     display="inline"
        //     style={{ textDecoration: done ? "line-through" : "initial" }}
        //     color={done ? "textSecondary" : "initial"}
        //   >
        //     {author}
        //   </Typography>
        // }
        secondary={
          <>
            <Typography
              display="inline"
              style={{ textDecoration: done ? "line-through" : "initial" }}
              color={done ? "textSecondary" : "initial"}
            >
              {text}{" "}
            </Typography>
            <Typography
              display="inline"
              color="textSecondary"
              variant="caption"
            >
              {createdAt?.toDate().toLocaleString()}
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          disabled={isDeleting}
          edge="end"
          aria-label="comments"
          onClick={() =>
            delTodo({
              userId: user.id,
              id,
            })
          }
          size="large"
        >
          <DeleteForever />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
