import { useContext, useEffect, useRef } from 'react';
import styles from './DependenceModal.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ModalContext } from '../../../store/modal-context/modal-context';
import { getOverview, upsertDependencies } from '../../../api/activities';
import { generateInstances, updateCondiction } from '../../../util/panel/panel';
import { AppContext } from '../../../store/app-context';
import DependenceCard from './modals/DependenceCard';
import { compareInstances, generateDepInstance } from '../../../util/helpers/activity';
import { cleanObject, preProcessDependency } from '../../../util/api-helpers/activity';
import { createTaskInstance } from '../../../api/task';
import { queryClient } from '../../../api/queryClient';


export default function DependenceModal({ isOpenModal, closeModal }) {
  const { id, task, dependencies } = useContext(ModalContext);
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


  const { mutateAsync: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities'])
  });

  async function helperCreateInstance() {
    const response = await createInstance({
      taskId: task.id,
      instance: cleanObject(task.instance),
    })
    return response.instance.id;
  }


  let activityInstances = generateInstances(
    fetchedActivities?.activities || [],
    fetchedActivities?.startdate,
    fetchedActivities?.finaldate
  );
  activityInstances = updateCondiction(activityInstances);
  

  let filteredInstances = [];
  if (!dependencies) {
    return;
  } else {
    filteredInstances = activityInstances.filter(activity => {
      return !dependencies.some(dep => compareInstances(dep.activity, activity));
    });
  }

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (isOpenModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenModal, closeModal, id, dependencies]);

  if (!isOpenModal) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <h3 className={styles.title}>Adicionar Dependências</h3>

        {dependencies && dependencies.length > 0 ? (
          <div className={styles.keywordsList}>
            <h4>Dependências Adicionadas:</h4>
            {dependencies && dependencies.map((dep, index) => {
              if (dep.type === "ACTIVITY") {
                return (
                  <DependenceCard key={index}
                    depActivityID={id}
                    dependencies={dependencies}
                    depCreateInstance={helperCreateInstance}
                    viewMode="select"
                    type={dep.type}
                    activity={dep.activity}
                  />
                )
              }
            }
            )}
          </div>
        ) : (
          <div className={styles.noKeywords}>
            <p>Nenhuma dependência adicionada.</p>
          </div>
        )}

        <div className={styles.dependencysList}>
          <h4>Lista de Atividades:</h4>
          {filteredInstances && filteredInstances.map((dep, index) => (
            <DependenceCard key={index}
              depActivityID={id}
              dependencies={dependencies}
              depCreateInstance={helperCreateInstance}
              instanceId={task.instance.id}
              viewMode="select"
              type="ACTIVITY"
              activity={dep}
            />)
          )}
        </div>
      </ div>
    </div>
  )
};