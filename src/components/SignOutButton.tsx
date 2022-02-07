import { LoadingButton } from "@mui/lab";
import type { FC } from "react";
import useAuth from "../app/hooks/useAuth";
import useOpen from "../app/hooks/useOpen";
import AlertDialog from "./AlertDialog";

type SignOutButtonProps = {};

const SignOutButton: FC<SignOutButtonProps> = () => {
  const openState = useOpen(false);
  const { mutateAsync, isLoading } = useAuth().logoutMtn;

  return (
    <>
      <LoadingButton
        loading={isLoading}
        color="inherit"
        onClick={openState.onOpen}
        disabled={isLoading}
      >
        Sign Out
      </LoadingButton>

      <AlertDialog
        {...openState}
        title="Sign Out"
        onConfirm={mutateAsync}
        confirmButtonProps={{
          color: "secondary",
          variant: "contained",
          loading: isLoading,
        }}
      />
    </>
  );
};

export default SignOutButton;
