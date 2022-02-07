import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
