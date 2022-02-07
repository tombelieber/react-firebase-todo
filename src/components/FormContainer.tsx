import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RouteEnum } from "../app/configs/router/routes";

type FormContainerProps = {
  title: string;
};

const TemplateBox: FC<{
  text: string;
  action: string;
  pathname: RouteEnum;
}> = ({ action, pathname, text }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography>{text}</Typography>
    <Typography>
      <Link to={pathname}>{action}</Link>
    </Typography>
  </Box>
);

const ContinueWithPhone: FC = () => {
  const push = useNavigate();

  return (
    <>
      <Button
        startIcon={<LocalPhoneIcon />}
        style={{
          backgroundColor: "#000000",
        }}
        variant="contained"
        onClick={() => push(RouteEnum.phone)}
      >
        Continue with Phone
      </Button>

      <div>
        <Typography color="GrayText" textAlign="center">
          or
        </Typography>

        <Typography variant="h6" align="center">
          continue with email
        </Typography>
      </div>
    </>
  );
};

const FormContainer: FC<FormContainerProps> = ({ title, children }) => {
  const { pathname } = useLocation();

  return (
    <Box height="100vh">
      <Stack
        maxWidth={400}
        height="100%"
        justifyContent="center"
        margin="auto"
        gap={2}
      >
        <Typography variant="h6" align="center">
          <strong>{title}</strong>
        </Typography>

        {pathname !== RouteEnum.phone && <ContinueWithPhone />}

        <form>
          <Stack gap={2}>{children}</Stack>
        </form>

        {pathname === RouteEnum.signup && (
          <TemplateBox
            text="Already have an account?"
            action="Sign In"
            pathname={RouteEnum.login}
          />
        )}
        {pathname === RouteEnum.login && (
          <TemplateBox
            text="Does not have an account?"
            action="Sign Up"
            pathname={RouteEnum.signup}
          />
        )}
        {pathname === RouteEnum.phone && (
          <TemplateBox
            text=""
            action="continue with email"
            pathname={RouteEnum.signup}
          />
        )}
      </Stack>
    </Box>
  );
};

export default FormContainer;
