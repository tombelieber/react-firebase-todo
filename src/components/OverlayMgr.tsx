import { FC } from "react";
import { ToastContainer } from "react-toastify";

type OverlayMgrProps = {};

const OverlayMgr: FC<OverlayMgrProps> = () => {
  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
};

export default OverlayMgr;
