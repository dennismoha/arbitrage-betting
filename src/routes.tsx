import { createBrowserRouter } from "react-router-dom";

import Cartesian from "./pages/Cartesian-page";
import Layout from "./components/layout/layout";

import NotFound from "./pages/404"; // Import NoPage component
import Arbitrage from "./pages/Arbitrage";
import Rules from "./pages/Rules";


const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, element: <Cartesian />
      },
      {
        path: "cartesian",
        element: <Cartesian />,
      },
      {
        path: "arbitrage",
        element: <Arbitrage />,
      },
      {
        path: "rules",
        element: <Rules />,
      },
    ],
  },
  
 
]);

export default AppRouter;
