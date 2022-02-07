import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../app/configs/firebase-config";
import { createUser } from "./users/api";

type EmailForm = {
  email: string;
  password: string;
};
export async function loginWithEmail({ email, password }: EmailForm) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
}

export async function signUpWithEmail({ email, password }: EmailForm) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await createUser({
    id: res.user.uid,
    email,
  });

  return res;
}

export async function logout() {
  return signOut(auth);
}

interface SignInWithPhoneParam {
  verificationId: string;
  otp: string;
}
export async function signInWithPhone({
  verificationId,
  otp,
}: SignInWithPhoneParam) {
  const credential = PhoneAuthProvider.credential(verificationId, otp);

  const userCredential = await signInWithCredential(auth, credential);
  if (!userCredential.user.phoneNumber)
    throw new Error("phoneNumber not found in user");

  const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser;
  if (isNewUser) {
    await createUser({
      id: userCredential.user.uid,
      phone: userCredential.user.phoneNumber,
    });
  }

  return userCredential;
}
