import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Container from '@mui/material/Container';


import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes.tsx";
import store, { persistor } from "@store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <RouterProvider router={AppRouter} />
        </Container>
      </PersistGate>
    </Provider>
  </StrictMode>
);
