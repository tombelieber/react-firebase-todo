// index.tsx

import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import "react-dropzone-uploader/dist/styles.css";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";
import { theme } from "./app/configs/mui-theme";
import { queryClient } from "./app/configs/react-query";
import { persistor, store } from "./app/configs/redux/store";
import { RootStoreProvider } from "./app/mobx/rootStore";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RootStoreProvider>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <App />
                </ThemeProvider>
              </StyledEngineProvider>
            </RootStoreProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
