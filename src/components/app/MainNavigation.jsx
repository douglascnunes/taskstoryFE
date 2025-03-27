import { Form, Link, useRouteLoaderData } from "react-router-dom";
import logo from '../../assets/logo.svg'

import style from './MainNavigation.module.css'


export default function MainNavigationApp() {
  const token = useRouteLoaderData('root');

  return (
    <nav className={style.nav}>
      <Link to="/app">
        <img src={logo} alt="taskstory logo" />
      </Link>
    </nav>
  )
};