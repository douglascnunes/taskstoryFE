import { Outlet } from "react-router-dom";
import MainNavigationApp from "../../components/app/MainNavigation";
import styles from './RootApp.module.css';
import AppContextProvider from "../../store/app-context";



export default function RootApp() {

  return (
    <AppContextProvider >
      <MainNavigationApp />
      <main className={styles.main}>
        <Outlet />
      </main>
    </AppContextProvider >
  )
};