import { FC } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthContainerProps = {
  mode: "signup" | "login" | "phone";
};

// jump to login / sign up by route, allow phone number login
const AuthContainer: FC<AuthContainerProps> = ({ mode }) => {
  if (mode === "login") return <Login />;
  return <SignUp />;
};

export default AuthContainer;
