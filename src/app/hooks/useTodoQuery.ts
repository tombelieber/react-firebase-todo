import { useQuery } from "react-query";
import { getTodos, TodoQueryFilter } from "../../api/todos/api";
import { useRootStore } from "../mobx/rootStore";

export default function useTodoQuery(
  userId: string,
  queryFilter: TodoQueryFilter,
) {
  const { setTodos } = useRootStore().todoStore;

  return useQuery(
    ["todos", queryFilter],
    ({ queryKey }) => {
      const [, queryFilter] = queryKey as [string, TodoQueryFilter];
      return getTodos(userId, queryFilter);
    },
    {
      onSuccess: (todos) => {
        setTodos(todos);
      },
      cacheTime: 0, // do not cache in React-Query
    },
  );
}
