import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ConfirmationResult, signInWithPhoneNumber } from "firebase/auth";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  auth,
  generateReCaptcha,
  getRecaptchaVerifier,
} from "../../app/configs/firebase-config";
import FormContainer from "../../components/FormContainer";
import OtpForm from "./OtpForm";

type PhoneAuthProps = {};

const PhoneAuth: FC<PhoneAuthProps> = () => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<{ phone: string }>({
    mode: "all",
    defaultValues: { phone: "" },
  });

  const onSubmit = handleSubmit(({ phone }) => {
    setLoading(true);
    generateReCaptcha("recaptcha-container-phone-auth");

    const appVerifier = getRecaptchaVerifier();
    if (!appVerifier) {
      toast.error("Failed to get RecaptchaVerifier");
      setLoading(false);
      return;
    }

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);
        setConfirmationResult(confirmationResult);
      })
      .catch((err: Error) => {
        setLoading(false);
        toast.error(err.message);

        // @ts-ignore
        window.recaptchaVerifier.render().then(function (widgetId) {
          // @ts-ignore
          grecaptcha.reset(widgetId);
        });
      });
  });

  return (
    <FormContainer title="Phone Auth">
      <Stack direction="row" alignItems="center" gap={2}>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              label="phone"
              type="tel"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Box>
          <LoadingButton
            loading={loading}
            size="small"
            color="primary"
            variant="outlined"
            type={!!confirmationResult ? "button" : "submit"}
            onClick={onSubmit}
          >
            Send code
          </LoadingButton>
        </Box>
      </Stack>

      {confirmationResult && (
        <OtpForm confirmationResult={confirmationResult} />
      )}

      <div id="recaptcha-container-phone-auth" />
    </FormContainer>
  );
};

export default PhoneAuth;
