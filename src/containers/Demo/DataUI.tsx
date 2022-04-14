import { CircularProgress, Paper, Typography } from "@mui/material";
import type { FC } from "react";
import ReactJson from "react-json-view";
import { DemoUser } from "./demo-user";

type DataUIProps = {
  title: string;
  loading: boolean;
  error: any;
  users: DemoUser[];
};

const DataUI: FC<DataUIProps> = ({ title, error, loading, users }) => {
  return (
    <Paper
      elevation={10}
      style={{
        height: "40vh",
        overflow: "scroll",
      }}
    >
      <Typography variant="h6">{title}</Typography>

      {loading && <CircularProgress />}
      <ReactJson
        name="Loading, Error"
        src={{
          loading,
          error: JSON.parse(JSON.stringify(error)),
        }}
        style={{
          backgroundColor: "#faeded",
        }}
      />

      <ReactJson
        name="users"
        src={users}
        collapsed={2}
        style={{
          backgroundColor: "#dffceb",
        }}
      />
    </Paper>
  );
};

export default DataUI;
