import { createBrowserRouter } from "react-router-dom";


import RootLayout from "./RootLayout";
import HomePage from "./Home";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
]);

export default router;