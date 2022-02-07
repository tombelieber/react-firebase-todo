import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  avatar?: string;
  username?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthday?: Timestamp;
}
