import { createBrowserRouter } from "react-router-dom";


import RootLayout from "./RootLayout";
import HomePage from "./Home";
import CreateAccountPage, { action as createAccountAction } from "./auth/CreateAccountPage";
import OnboardingPage, { loader as questionsLoader } from "./auth/OnboardingPage";
import MainPanelApp from "./app/MainPanelApp";
import RootApp from "./app/RootApp";
import LoginPage, { action as loginAction } from "./auth/LoginPage";


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
        action: createAccountAction,
        element: <CreateAccountPage />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
        loader: questionsLoader,
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction,
      }
    ]
  },
  {
    path: '/app',
    element: <RootApp />,
    children: [
      {
        index: true,
        element: <MainPanelApp />
      }
    ]
  }
]);

export default router;