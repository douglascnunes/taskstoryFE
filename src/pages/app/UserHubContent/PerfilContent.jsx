import { useContext } from 'react';
import { PROCRASTINATION_TYPE } from '../../../util/enum';
import { AppContext } from '../../../store/app-context';
import styles from './PerfilContent.module.css';
import PerfectionismGraph from './PerfectionismGraph';

export default function PerfilContent() {
  const { user } = useContext(AppContext);


  const procrastinationTypeLabel = PROCRASTINATION_TYPE[user.procrastinationType] || PROCRASTINATION_TYPE.NOTDEFINED;

  const levelPercent = Math.min((user.currentLevelPoints / user.userLevel.expRequiredToUp) * 100, 100);

  const autoRegPercent = Math.min((user.selfRegulationPoints / 5) * 100, 100);
  const autoEffPercent = Math.min((user.selfEfficacynPoints / 5) * 100, 100);




  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={`/images/avatar/size_300/${user?.avatar}`} alt="avatar" className={styles.avatar} />
        <div>
          <h2 className={styles.name}>{user.name}</h2>
          <span className={styles.procrastinationType}>{procrastinationTypeLabel[0]}</span>
        </div>
      </div>
      <div className={styles.userLevel}>
        <span className={styles.level}>Nível do Usuário: {user.userLevel.level}</span>
        <div className={styles.progressBar}>
          <div
            className={styles.fill}
            style={{ width: `${levelPercent}%` }}
          />
        </div>
      </div>
      <div className={styles.autoRegEffcontainer}>
        <div>
          <span className={styles.labelbar}>Nível de Autorregulação</span>
          <div className={styles.progressBarAutoRegEff}>
            <div className={styles.fillAutoRegEff} style={{ width: `${autoRegPercent}%` }} />
          </div>
        </div>
        <div>
          <span className={styles.labelbar}>Nível de Autoeficácia</span>
          <div className={styles.progressBarAutoRegEff}>
            <div className={styles.fillAutoRegEff} style={{ width: `${autoEffPercent}%` }} />
          </div>
        </div>
      </div>
      <hr className={styles.divbar}></hr>
      <PerfectionismGraph regulationPoints={user.selfRegulationPoints} efficacyPoints={user.selfEfficacynPoints} />
    </div>
  );
}