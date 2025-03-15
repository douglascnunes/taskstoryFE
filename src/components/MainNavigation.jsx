import { Link } from "react-router-dom";
import logo from "../assets/TaskStory_Logo.png"

import classes from './MainNavigation.module.css'


function MainNavigationPage() {
  return (
    <nav className={classes.nav}>
      <img src={logo} alt="taskstory logo" />
      <ul>
        <li>
          <Link to="/login">
            Entrar
          </Link>
        </li>
        <li>
          <Link>
            Crie uma Conta
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default MainNavigationPage;