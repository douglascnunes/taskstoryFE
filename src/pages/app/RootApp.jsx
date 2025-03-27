import { Outlet } from "react-router-dom";
import MainNavigationApp from "../../components/app/MainNavigation";



export default function RootApp() {
  return (
    <>
      <MainNavigationApp />
      <main>
        <Outlet />
      </main>
    </>
  )
};