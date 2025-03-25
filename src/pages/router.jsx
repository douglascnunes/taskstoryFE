import { createBrowserRouter } from "react-router-dom";


import RootLayout from "./RootLayout";
import HomePage from "./Home";
import CreateAccountPage, { action as createAccountAction } from "./auth/CreateAccountPage";
import OnboardingPage, { loader as questionsLoader } from "./auth/OnboardingPage";
import MainPanelApp from "./app/MainPanelApp";
import RootApp from "./app/RootApp";
import LoginPage, { action as loginAction } from "./auth/LoginPage";
import { checkAuthLoader, checkProcrastinationType, tokenLoader } from "../util/auth";
import { action as logoutAction } from "../pages/auth/Logout";


const checkAuthLoader_AND_questionsLoader = async () => {
  return Promise.all([checkAuthLoader(), questionsLoader()]);
}

const checkAuthLoader_AND_checkProcrastinationType = async () => {
  return Promise.all([checkAuthLoader(), checkProcrastinationType()]);
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'signup',
        action: createAccountAction,
        element: <CreateAccountPage />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
        loader: checkAuthLoader_AND_questionsLoader,
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
    loader: checkAuthLoader_AND_checkProcrastinationType,
    children: [
      {
        index: true,
        element: <MainPanelApp />
      }
    ]
  },
  {
    path: 'logout',
    action: logoutAction
  }
]);

export default router;