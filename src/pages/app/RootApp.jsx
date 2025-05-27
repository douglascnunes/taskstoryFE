import { Outlet } from "react-router-dom";
import MainNavigationApp from "../../components/app/MainNavigation";
import styles from './RootApp.module.css';


export default function RootApp() {
  return (
    <>
      <MainNavigationApp />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
};