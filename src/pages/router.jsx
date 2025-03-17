import { createBrowserRouter } from "react-router-dom";


import RootLayout from "./RootLayout";
import HomePage from "./Home";
import CreateAccountPage, { action as createAccountAction } from "./CreateAccount";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'create',
        element: <CreateAccountPage/>,
        action: createAccountAction,
      }
    ]
  }
]);

export default router;