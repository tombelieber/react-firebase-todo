import { useState } from "react";

export default function useOpen(initialState: boolean = false) {
  // useOpen hook to open and close the modal
  const [open, setOpen] = useState(initialState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return { open, onOpen, onClose };
}
