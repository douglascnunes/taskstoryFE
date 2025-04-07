import { Outlet } from "react-router-dom";
import MainNavigationApp from "../../components/app/MainNavigation";
import FloatingActionButton from "../../components/app/FloatingActionButton";


export default function RootApp() {
  return (
    <>
      <MainNavigationApp />
      <main>
        <Outlet />
        <FloatingActionButton />
      </main>
    </>
  )
};