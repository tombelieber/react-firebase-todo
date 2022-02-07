import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";

type AlertDialogProps = {
  onClose: () => void;
  open: boolean;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  content?: string;
  onCancel?: () => void;
  onConfirm?: () => void;

  confirmButtonProps?: LoadingButtonProps;
};

const AlertDialog: FC<AlertDialogProps> = ({
  open = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  title = "Wanring",
  content = "Are you sure to do this?",
  onClose,
  onCancel,
  onConfirm,
  confirmButtonProps,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color="primary"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* if no custom cancel logic, default to close dialog*/}
          <Button onClick={onCancel ?? onClose}>{cancelText}</Button>
          <LoadingButton onClick={onConfirm} autoFocus {...confirmButtonProps}>
            {confirmText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
