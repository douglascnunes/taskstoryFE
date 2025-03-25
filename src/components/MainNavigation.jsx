import { Form, Link, useRouteLoaderData } from "react-router-dom";
import logo from "../assets/logo.svg"

import style from './MainNavigation.module.css'


function MainNavigationPage() {
  const token = useRouteLoaderData('root');

  return (
    <nav className={style.nav}>
      <Link to="/">
        <img src={logo} alt="taskstory logo" />
      </Link>
      {!token &&
        <ul>
          <li>
            <Link to="/login">
              Entrar
            </Link>
          </li>
          <li>
            <Link to="/signup">
              Crie uma Conta
            </Link>
          </li>
        </ul>
      }
      {token &&
        <ul>
          <li>
            <Link to="/app">
            <button className={style.appButton}>Ir para o App</button>
            </Link>
          </li>
          <li>
            <Form action="/logout" method="POST">
              <button>Sair</button>
            </Form>
          </li>
        </ul>
      }
    </nav>
  )
}

export default MainNavigationPage;