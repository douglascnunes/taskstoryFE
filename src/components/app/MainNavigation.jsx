import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'

import style from './MainNavigation.module.css'
import { useContext, useState } from "react";
import { AppContext } from "../../store/app-context";
import LevelBar from "../common/LevelBar";
import Dropdown from "../common/Dropdown";


export default function MainNavigationApp() {
  const { user } = useContext(AppContext);
  const [openProfile, setOpenProfile] = useState(false);

  let autoRegPercent, autoEffPercent;

  if (user) {
    autoRegPercent = Math.min((user.selfRegulationPoints / 5) * 100, 100);
    autoEffPercent = Math.min((user.selfEfficacynPoints / 5) * 100, 100);
  }

  const links = [
    { label: 'Perfil', path: '/app/perfil' },
    { label: 'Conta de Usuário', path: '/app/perfil' },
  ];

  return (
    <nav className={style.nav}>
      <Link to="/app">
        <img src={logo} alt="taskstory logo" />
      </Link>
      <div>
      </div>
      {user && (
        <div className={style.profile} onClick={() => setOpenProfile(prev => !prev)}>
          <LevelBar
            level={user.userLevel.level}
            currentPoints={user.currentLevelPoints}
            nextLevelPoints={user.userLevel.expRequiredToUp}
            procrastinationType={user.procrastinationType}
          />
          <div className={style.autoRegEffcontainer}>
            <div>
              <span className={style.labelbar}>Regul.</span>
              <div className={style.progressBarAutoRegEff}>
                <div className={style.fillAutoRegEff} style={{ width: `${autoRegPercent}%` }} />
              </div>
            </div>
            <div>
              <span className={style.labelbar}>Efica.</span>
              <div className={style.progressBarAutoRegEff}>
                <div className={style.fillAutoRegEff} style={{ width: `${autoEffPercent}%` }} />
              </div>
            </div>
          </div>
          <img src={`/images/avatar/size_300/${user?.avatar}`} alt="avatar" className={style.avatar} />
        </div>
      )}
      {!user && <p>Carregando...</p>}

      {openProfile && (
        <Dropdown
          onClose={() => setOpenProfile(false)}
          links={links}
        />
      )}
    </nav >
  )
};