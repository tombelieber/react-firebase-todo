// ControlPanel.tsx

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { FC } from "react";
import { TodoQueryFilter } from "../../api/todos/api";
import AddTodo from "./AddTodo";
import { TodoFilter } from "./types";
type ControlPanelProps = {
  filter: TodoFilter;
  queryFilter: TodoQueryFilter;
  onToggleFilterTodo: () => void;
  onToggleFilterCompleted: () => void;
  sortText: () => void;
  sortDate: () => void;
};

const getSortIcon = (direction: "desc" | "asc") =>
  direction === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;

const ControlPanel: FC<ControlPanelProps> = ({
  filter,
  queryFilter,
  onToggleFilterTodo,
  onToggleFilterCompleted,
  sortDate,
  sortText,
}) => {
  return (
    <Stack gap={2}>
      <AddTodo />

      <ButtonGroup size="small">
        <Button
          disableRipple
          variant={queryFilter.field === "text" ? "contained" : "outlined"}
          onClick={sortText}
          endIcon={
            queryFilter.field === "text"
              ? getSortIcon(queryFilter.direction)
              : undefined
          }
        >
          sort by text
        </Button>
        <Button
          disableRipple
          variant={queryFilter.field === "createdAt" ? "contained" : "outlined"}
          onClick={sortDate}
          endIcon={
            queryFilter.field === "createdAt"
              ? getSortIcon(queryFilter.direction)
              : undefined
          }
        >
          sort by date
        </Button>
      </ButtonGroup>

      <Stack direction="row" justifyContent="space-between">
        <ButtonGroup>
          <Button
            disableRipple
            variant={filter.completed === false ? "contained" : "outlined"}
            color="info"
            onClick={onToggleFilterTodo}
          >
            todo
          </Button>
          <Button
            disableRipple
            variant={filter.completed === true ? "contained" : "outlined"}
            color="info"
            onClick={onToggleFilterCompleted}
          >
            completed
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};

export default ControlPanel;
