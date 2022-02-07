import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../app/hooks/useAuth";
import FormContainer from "../../components/FormContainer";

type SignUpForm = {
  email: string;
  password: string;
};

type SignUpProps = {};

const SignUp: FC<SignUpProps> = () => {
  const { mutateAsync, isLoading } = useAuth().signUpWithEmailMtn;

  const { control, handleSubmit } = useForm<SignUpForm>({
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
    <FormContainer title="Sign Up">
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
        Sign Up
      </LoadingButton>
    </FormContainer>
  );
};

export default SignUp;
