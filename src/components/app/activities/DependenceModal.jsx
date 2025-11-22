import { useContext, useEffect, useRef } from 'react';
import styles from './DependenceModal.module.css';
import { useQuery } from '@tanstack/react-query';
import { ModalContext } from '../../../store/modal-context/modal-context';
import { getOverview } from '../../../api/activities';
import { generateInstances, updateCondiction } from '../../../util/panel/panel';
import { AppContext } from '../../../store/app-context';
import DependenceCard from './modals/DependenceCard';
import { compareInstances, generateInstance } from '../../../util/helpers/activity';


export default function DependenceModal({ isOpenModal, closeModal }) {
  const { dependencies } = useContext(ModalContext);
  const { startDate, endDate } = useContext(AppContext);

  const modalRef = useRef();

  const { data: fetchedActivities } = useQuery({
    queryKey: ['activities', 'overview', startDate, endDate],
    queryFn: ({ signal }) =>
      getOverview({
        signal,
        startdateFilter: startDate,
        finaldateFilter: endDate,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
  });

  let activityInstances = generateInstances(
    fetchedActivities?.activities || [],
    fetchedActivities?.startdate,
    fetchedActivities?.finaldate
  );

  activityInstances = updateCondiction(activityInstances);

  const filteredInstances = activityInstances.filter(activity => {
    if (!dependencies) {
      return activityInstances;
    }
    return !dependencies.some(dep => compareInstances(dep.activity, activity));
  });



  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal]);

  if (!isOpenModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3 className={styles.title}>Adicionar Dependências</h3>

        {dependencies && dependencies.length > 0 ? (
          <div className={styles.keywordsList}>
            <h4>Dependências Adicionadas:</h4>
            {dependencies && dependencies.map((dependency, index) => {
              const updatedDependency = {
                type: dependency.type,
                activity: generateInstance(dependency.activity),
                description: dependency.description,
              };
              return (<DependenceCard key={index} dependency={updatedDependency} viewMode="select" />)
            })}
          </div>
        ) : (
          <div className={styles.noKeywords}>
            <p>Nenhuma dependência adicionada.</p>
          </div>
        )}

        <div className={styles.dependencysList}>
          <h4>Lista de Atividades:</h4>
          {filteredInstances.map((dep, index) => (
            <DependenceCard key={index} dependency={{ type: "ACTIVITY", activity: dep, description: null }} viewMode="select" />
          ))}
        </div>
      </ div>
    </div>
  )
};