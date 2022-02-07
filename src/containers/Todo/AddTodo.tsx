import { Button, Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../../app/configs/redux/hooks";
import { selectForceUser } from "../../app/configs/redux/slices/appSlice";
import useTodo from "../../app/hooks/useTodo";

type AddTodoProps = {};

const AddTodo: FC<AddTodoProps> = () => {
  const user = useAppSelector(selectForceUser);
  // get user in app
  const [value, setValue] = useState("");

  const { mutateAsync: addTodo, isLoading: isAdding } = useTodo().addTodoMtn;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleAddTodo: React.MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault();

    const trimedText = value.trim();
    // Add a new document with a generated id.
    addTodo({
      text: trimedText,
      userId: user.id,
    });

    // reset input after create
    setValue("");
  };

  return (
    <form>
      <Stack direction="row" gap={2}>
        <TextField
          fullWidth
          placeholder="Try yourself!"
          value={value}
          onChange={handleChange}
          size="small"
        />

        <Button
          disableRipple
          disabled={!value.trim() || isAdding}
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleAddTodo}
        >
          {isAdding ? "Adding..." : "Add"}
        </Button>
      </Stack>
    </form>
  );
};

export default AddTodo;
