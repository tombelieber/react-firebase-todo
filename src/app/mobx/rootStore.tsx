import { createContext, FC, useContext } from "react";
import { TodoStore } from "./todoStore";

export class RootStore {
  todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore(this);
  }
}

export const StoreContext = createContext<RootStore | undefined>(undefined);

// this will be the function available for the app to connect to the stores

// create the hook
export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
}

// create the provider component
export const RootStoreProvider: FC = ({ children }) => {
  //only create the store once ( store is a singleton)
  const root = new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};
