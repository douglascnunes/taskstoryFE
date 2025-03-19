import { createBrowserRouter } from "react-router-dom";


import RootLayout from "./RootLayout";
import HomePage from "./Home";
import CreateAccountPage, { action as createAccountAction } from "./CreateAccount";
import OnboardingPage, { loader as questionsLoader} from "./OnboardingPage";


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
    ]
  }
]);

export default router;