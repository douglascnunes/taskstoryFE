import { Outlet } from "react-router-dom";


import MainNavigationPage from "../components/MainNavigation";


export default function RootLayout() {
  return (
    <>
      <MainNavigationPage />
      <main>
        <Outlet />
      </main>
    </>
  )
};
