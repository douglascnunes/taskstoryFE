import { Outlet } from "react-router-dom";


import MainNavigationPage from "../components/MainNavigation";


function RootLayout() {
  return (
    <>
      <MainNavigationPage />
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default RootLayout;