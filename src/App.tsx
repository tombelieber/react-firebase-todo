// App.tsx

import { CssBaseline } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./app/configs/router";
import { RouteEnum } from "./app/configs/router/routes";
import NavBar from "./components/NavBar";
import OverlayMgr from "./components/OverlayMgr";
import AuthContainer from "./containers/Auth/AuthContainer";
import PhoneAuth from "./containers/Auth/PhoneAuth";
import Profile from "./containers/Profile";
import Todo from "./containers/Todo";

function App() {
  return (
    <>
      <CssBaseline />
      <OverlayMgr />
      <NavBar />

      <Routes>
        <Route
          path={RouteEnum.root}
          element={
            <RequireAuth>
              <Todo />
            </RequireAuth>
          }
        />
        <Route
          path={RouteEnum.profile}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path={RouteEnum.phone} element={<PhoneAuth />} />
        <Route
          path={RouteEnum.login}
          element={<AuthContainer mode="login" />}
        />
        <Route
          path={RouteEnum.signup}
          element={<AuthContainer mode="signup" />}
        />
      </Routes>

      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
    </>
  );
}

export default App;
