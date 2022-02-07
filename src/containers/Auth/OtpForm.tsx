import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { ConfirmationResult } from "firebase/auth";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../app/hooks/useAuth";

type PhoneAuthForm = {
  otp: string;
};

type OtpFormProps = {
  confirmationResult: ConfirmationResult;
};

const OtpForm: FC<OtpFormProps> = ({ confirmationResult }) => {
  const { mutateAsync, isLoading } = useAuth().signInWithPhoneMtn;

  const { control, handleSubmit } = useForm<PhoneAuthForm>({
    mode: "all",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = handleSubmit(async ({ otp }) => {
    mutateAsync({
      verificationId: confirmationResult.verificationId,
      otp,
    });
  });

  return (
    <>
      <Controller
        name="otp"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="One Time Passcode"
            type="text"
            value={value}
            onChange={onChange}
            autoComplete="one-time-code"
          />
        )}
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        type="submit"
        onClick={onSubmit}
      >
        verify
      </LoadingButton>
    </>
  );
};

export default OtpForm;
