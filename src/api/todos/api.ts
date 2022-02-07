import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../app/configs/firebase-config";
import { Todo } from "./model";

const todoConverter = {
  toFirestore(todo: Todo): DocumentData {
    return todo;
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Todo {
    const data = snapshot.data(options) as Todo;
    return { ...data, id: snapshot.id };
  },
};

const todoCollectionRef = (userId: string) =>
  collection(db, `users/${userId}/todos`).withConverter(todoConverter);

const todoDocRef = (userId: string, id: string) =>
  doc(db, `users/${userId}/todos/${id}`);

export type TodoQueryFilter = {
  field: "createdAt" | "text";
  direction: "asc" | "desc";
};
export const getTodos = async (
  userId: string,
  queryFilter: TodoQueryFilter,
) => {
  const q = query(
    todoCollectionRef(userId),
    orderBy(queryFilter.field, queryFilter.direction),
    limit(20),
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((e) => {
    return e.data();
  });
};

interface AddTodoParam {
  userId: string;
  text: string;
}
export const addTodo = async ({ text, userId }: AddTodoParam) => {
  // TODO data converter optimisation to deal with id field on add doc case
  // @ts-ignore
  return addDoc(todoCollectionRef(userId), {
    text,
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

interface DeleteTodoParam {
  userId: string;
  id: string;
}
export const delTodo = async ({ userId, id }: DeleteTodoParam) => {
  return deleteDoc(todoDocRef(userId, id));
};

interface UpdateTodo {
  userId: string;
  id: string;
  completed: boolean;
}
export const updateTodo = async ({ userId, id, completed }: UpdateTodo) => {
  return updateDoc(todoDocRef(userId, id), {
    completed,
  });
};
