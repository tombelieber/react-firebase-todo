import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../api/users/api";
import { useAppDispatch, useAppSelector } from "../configs/redux/hooks";
import {
  invalidateUser,
  selectForceUser,
} from "../configs/redux/slices/appSlice";

export default function useUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectForceUser);

  const updateUserMtn = useMutation(updateUser, {
    onSuccess: async () => {
      toast.success("update user info successfully!");

      const userData = await getUser(user.id);
      if (!userData) {
        toast.error("failed to fetch user from firestore");
        return;
      }

      dispatch(invalidateUser(userData));
    },
  });

  return {
    updateUserMtn,
  };
}
