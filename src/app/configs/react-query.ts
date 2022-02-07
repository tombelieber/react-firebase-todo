import { QueryClient } from "react-query";
import { toast } from "react-toastify";

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => {
        toast.error((err as Error).message);
      },
    },
    queries: {
      onError: (err) => {
        toast.error((err as Error).message);
      },
    },
  },
});
