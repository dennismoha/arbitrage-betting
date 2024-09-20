import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import {  RouterProvider } from "react-router-dom";
import AppRouter from "./routes.tsx";





createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={AppRouter} />
      
    
  </StrictMode>
);


