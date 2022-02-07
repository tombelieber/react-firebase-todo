import { User } from "firebase/auth";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loginWithEmail,
  logout,
  signInWithPhone,
  signUpWithEmail,
} from "../../api/auth-api";
import { getUser } from "../../api/users/api";
import { useAppDispatch } from "../configs/redux/hooks";
import { clearUser, saveUser } from "../configs/redux/slices/appSlice";
import { RouteEnum } from "../configs/router/routes";

export const useLoginRedirect = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  // @ts-ignore
  const from = location.state?.from?.pathname || RouteEnum.root;

  // given a firebase User object, fetch firestore user and save it to redux store, then redirect to the from page
  const loginSuccessRedirect = useCallback(
    async (firebaseUser: User) => {
      try {
        const userData = await getUser(firebaseUser.uid);
        if (!userData) throw Error("User not found");

        dispatch(saveUser({ firebaseUser, user: userData }));
        navigate(from, { replace: true });
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
    [dispatch, from, navigate],
  );

  return { loginSuccessRedirect };
};

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { loginSuccessRedirect } = useLoginRedirect();

  const logoutMtn = useMutation(logout, {
    onSuccess: () => {
      dispatch(clearUser());
    },
  });

  const loginWithEmailMtn = useMutation(loginWithEmail, {
    onSuccess: ({ user }) => loginSuccessRedirect(user),
  });
  const signUpWithEmailMtn = useMutation(signUpWithEmail, {
    onSuccess: ({ user }) => loginSuccessRedirect(user),
  });
  const signInWithPhoneMtn = useMutation(signInWithPhone, {
    onSuccess: ({ user }) => loginSuccessRedirect(user),
  });

  return {
    logoutMtn,
    loginWithEmailMtn,
    signUpWithEmailMtn,
    signInWithPhoneMtn,
  };
}
