import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/configs/redux/hooks";
import { selectUser } from "../app/configs/redux/slices/appSlice";
import { RouteEnum } from "../app/configs/router/routes";
import SignOutButton from "./SignOutButton";

const ButtonAppBar: FC = () => {
  const push = useNavigate();
  const user = useAppSelector(selectUser);
  const UnAuthButtons = (
    <>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => {
          push(RouteEnum.signup);
        }}
      >
        Sign Up
      </Button>
    </>
  );

  const AuthButtons = (
    <>
      <Button
        color="inherit"
        onClick={() => {
          push(RouteEnum.profile);
        }}
        style={{ textTransform: "none" }}
        variant="outlined"
      >
        <Typography>{user?.username || user?.email || user?.phone}</Typography>
      </Button>

      <Button
        color="inherit"
        onClick={() => push(RouteEnum.demo)}
        style={{ textTransform: "none" }}
        variant="outlined"
      >
        Demo
      </Button>

      <SignOutButton />
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              disableRipple
              onClick={() => {
                push(RouteEnum.root);
              }}
              style={{ textTransform: "none" }}
            >
              <Typography variant="h6" component="div">
                Todo App v3
              </Typography>
            </Button>
          </Box>

          <Stack direction="row" gap={2} alignItems="center">
            {user ? AuthButtons : UnAuthButtons}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
