import { Form, Link, useRouteLoaderData } from "react-router-dom";
import logo from '../../assets/logo.svg'

import style from './MainNavigation.module.css'
import { useContext } from "react";
import { AppContext } from "../../store/app-context";
import LevelBar from "../common/LevelBar";


export default function MainNavigationApp() {
  const { user } = useContext(AppContext);

  return (
    <nav className={style.nav}>
      <Link to="/app">
        <img src={logo} alt="taskstory logo" />
      </Link>
      {user && (
        <div className={style.profile}>
          <LevelBar
            level={user.userLevel.level}
            currentPoints={user.currentLevelPoints}
            nextLevelPoints={user.userLevel.expRequiredToUp}
            procrastinationType={user.procrastinationType}
          />
          <img src={`/images/avatar/size_300/${user?.avatar}`} alt="avatar" className={style.avatar} />
        </div>
      )}
      {!user && <p>Carregando...</p>}
    </nav >
  )
};