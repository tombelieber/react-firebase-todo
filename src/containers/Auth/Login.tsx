import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../app/hooks/useAuth";
import FormContainer from "../../components/FormContainer";

type LoginForm = {
  email: string;
  password: string;
};

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  const { mutateAsync, isLoading } = useAuth().loginWithEmailMtn;

  const { control, handleSubmit } = useForm<LoginForm>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(({ email, password }) => {
    mutateAsync({
      email,
      password,
    });
  });

  return (
    <FormContainer title="Login">
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="email"
            type="email"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="password"
            type="password"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <LoadingButton
        loading={isLoading}
        variant="contained"
        type="submit"
        onClick={onSubmit}
      >
        Login
      </LoadingButton>
    </FormContainer>
  );
};

export default Login;
