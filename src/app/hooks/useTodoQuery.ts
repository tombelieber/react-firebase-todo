import { useQuery } from "react-query";
import { TodoQueryFilter, getTodos } from "../../api/todos/api";

export default function useTodoQuery(
  userId: string,
  queryFilter: TodoQueryFilter,
) {
  return useQuery(["todos", queryFilter], ({ queryKey }) => {
    const [, queryFilter] = queryKey as [string, TodoQueryFilter];
    return getTodos(userId, queryFilter);
  });
}
