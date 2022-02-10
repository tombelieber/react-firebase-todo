import { Box, Container, Stack } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { delay } from "../../app/utils";
import DataUI from "./DataUI";
import { DemoUser } from "./demo-user";

type DemoProps = {};

const Demo: FC<DemoProps> = () => {
  // * API
  const fetchUsers = async () => {
    // throw new Error("fake error");
    await delay(1000);
    return await axios.get<any, AxiosResponse<DemoUser[]>>(
      "https://jsonplaceholder.typicode.com/users",
    );
  };

  // ! pure react hook
  const [users, setUsers] = useState<DemoUser[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      fetchUsers().then(({ data }) => {
        setUsers(data);
        setError(null);
        toast.success(`[State] Success fetched ${data.length} users`);
        setLoading(false);
      });
    } catch (error) {
      setError(error as Error);
      toast.error(`[State] ${(error as Error)?.message}`);
      setLoading(false);
    }
  }, []);

  // ! react-query
  const {
    data: rqUsers = [],
    isLoading,
    error: rqError,
  } = useQuery("users", fetchUsers, {
    // * transformation
    select: (res) => res.data,

    onSuccess: (data: DemoUser[]) => {
      toast.success(
        `[React-Query] Success fetched ${
          data.length
        } users ${new Date().toLocaleTimeString()}`,
      );
    },

    onError: (error) => {
      toast.error(`[React-Query] ${(error as Error)?.message}`);
    },

    // config
    refetchInterval: 1000 * 10, // 10s
    retry: 3,

    // cacheTime
    // staleTime
    enabled: users.length > 0, // fetch after react state done fetching
  });

  const queryClient = useQueryClient();

  const queryCacheData = queryClient.getQueryData("users");
  return (
    <>
      <Container maxWidth="xl">
        <Box height="100vh">
          <Stack height="100%" margin="auto" gap={4}>
            <DataUI
              title="pure react hook"
              loading={loading}
              error={JSON.stringify(error)}
              users={users}
            />
            <DataUI
              title="React-Query"
              loading={isLoading}
              error={JSON.stringify(rqError)}
              users={rqUsers}
            />

            <div>
              <DataUI
                title="React-Query-QueryCacheData"
                loading={false}
                error={false}
                users={(queryCacheData as DemoUser[]) ?? []}
              />
            </div>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Demo;
