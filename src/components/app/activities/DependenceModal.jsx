import { useContext, useEffect, useRef } from 'react';
import styles from './DependenceModal.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ModalContext } from '../../../store/modal-context/modal-context';
import { getOverview, upsertDependencies } from '../../../api/activities';
import { generateInstances, updateCondiction } from '../../../util/panel/panel';
import { AppContext } from '../../../store/app-context';
import DependenceCard from './modals/DependenceCard';
import { compareInstances, generateInstance } from '../../../util/helpers/activity';
import { cleanObject, preProcessDependency } from '../../../util/api-helpers/activity';
import { createTaskInstance } from '../../../api/task';
import { queryClient } from '../../../api/queryClient';


export default function DependenceModal({ isOpenModal, closeModal }) {
  const { id, task, dependencies, getInstanceId } = useContext(ModalContext);
  const { startDate, endDate } = useContext(AppContext);

  const modalRef = useRef();

  const { mutate: mutateUpsertDependencies } = useMutation({
    mutationFn: upsertDependencies,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutateAsync: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities'])
  });

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

  async function handleClose() {
    if (!dependencies || dependencies.length === 0) return;
    let instanceId = getInstanceId();
    if (!instanceId) {
      const response = await createInstance({ taskId: task.id, instance: cleanObject(task.instance) });
      instanceId = response.instance.taskId;
    };
    console.log('Instance ID on close:', instanceId);
    mutateUpsertDependencies({
      activityId: id,
      dependencies: preProcessDependency(instanceId, dependencies),
    });
  }


  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
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