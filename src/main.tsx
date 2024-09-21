import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes.tsx";
import { store } from "@store/store";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  </StrictMode>
);
