import { AuthErrorCodes, updateEmail } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  SnapshotOptions,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../app/configs/firebase-config";
import { User } from "./model";

const userConverter = {
  toFirestore(user: User): DocumentData {
    return user;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): User {
    const data = snapshot.data(options) as User;
    return data;
  },
};

export const userCollectionRef = collection(db, "users").withConverter(
  userConverter,
);
export const userDocRef = (id: string) =>
  doc(db, `users/${id}`).withConverter(userConverter);

// TODO CRUD
//

interface CreateUserParam {
  id: string;
  avatar?: string;
  username?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: Timestamp;
}
export const createUser = async (param: CreateUserParam) => {
  return setDoc(userDocRef(param.id), {
    ...param,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const getUser = async (id: string) => {
  return (await getDoc(userDocRef(id))).data();
};

interface UpdateUserParam {
  id: string;
  avatar?: string;
  username?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: Timestamp;
}
export const updateUser = async ({ id, ...param }: UpdateUserParam) => {
  if (!auth.currentUser) throw new Error("Not current user");

  // if user updated email, also update it in firebase auth
  if (!!param.email && auth.currentUser?.email !== param.email) {
    await updateEmail(auth.currentUser, param.email).catch((error) => {
      // TODO: handle  reauthenticateWithCredential if user auth too old
      if (error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN) {
        toast.error("Your account is too old, please login again");
      }
    });
  }

  return updateDoc(userDocRef(id), param);
};

export const getProfilePic = (filename: string) => {
  const aaaRef = ref(storage, filename);
  return getDownloadURL(aaaRef);
};
