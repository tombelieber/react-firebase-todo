import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../../../../api/users/model";
import { RootState } from "../store";

export interface AppState {
  firebaseUser?: FirebaseUser;
  user?: User;
}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveUser: (
      app,
      action: PayloadAction<{ firebaseUser: FirebaseUser; user: User }>,
    ) => {
      app.firebaseUser = action.payload.firebaseUser;
      app.user = action.payload.user;
    },

    invalidateUser(app, action: PayloadAction<User>) {
      app.user = action.payload;
    },

    clearUser: (app) => {
      app.firebaseUser = undefined;
      app.user = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser, invalidateUser } = appSlice.actions;

export default appSlice.reducer;

const selectApp = (state: RootState) => state.app;

export const selectFirebaseUser = createSelector(
  selectApp,
  (app) => app.firebaseUser,
);

export const selectIsLogin = createSelector(
  selectApp,
  (app) => !!app.firebaseUser,
);

export const selectUser = createSelector(selectApp, (app) => app.user);

export const selectForceUser = createSelector(selectApp, (app) => {
  if (!app.user) {
    // TODO add error boundary to handle no user case globally
    throw new Error("no user");
  }

  return app.user;
});
