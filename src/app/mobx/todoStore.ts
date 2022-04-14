import { makeAutoObservable } from "mobx";
import { Todo } from "../../api/todos/model";
import { RootStore } from "./rootStore";

export class TodoStore {
  todos: Todo[];
  root: RootStore;

  constructor(root: RootStore) {
    makeAutoObservable(this, { root: false });
    this.root = root;
    this.todos = [];
  }

  // must use arrow fnc
  setTodos = (todos: Todo[]) => {
    this.todos = todos;
  };
}
