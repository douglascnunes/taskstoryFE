import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

import classes from './MainNavigation.module.css'


function MainNavigationPage() {
  return (
    <nav className={classes.nav}>
      <Link to="/">
        <img src={logo} alt="taskstory logo" />
      </Link>
      <ul>
        <li>
          <Link to="/login">
            Entrar
          </Link>
        </li>
        <li>
          <Link to="create">
            Crie uma Conta
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MainNavigationPage;