import { useMutation, useQueryClient } from "react-query";
import { addTodo, delTodo, updateTodo } from "../../api/todos/api";

export function useInvalidateTodo() {
  const queryClient = useQueryClient();
  const invalidateTodos = () => {
    queryClient.invalidateQueries("todos");
  };

  return { invalidateTodos };
}

export default function useTodo() {
  const { invalidateTodos } = useInvalidateTodo();

  const addTodoMtn = useMutation(addTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const delTodoMtn = useMutation(delTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  const updateTodoMtn = useMutation(updateTodo, {
    onSuccess: () => {
      invalidateTodos();
    },
  });

  return {
    addTodoMtn,
    delTodoMtn,
    updateTodoMtn,
  };
}
