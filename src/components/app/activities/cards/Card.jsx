import styles from './Card.module.css';
import KeywordTag from '../KeywordTag';
import TaskCard from './task/TaskCard';
import { STATES_CARD_COLORS } from '../../../../util/color';
import { dataTagErrorSymbol, useQuery } from '@tanstack/react-query';
import { getActivity } from '../../../../api/activities';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../../store/app-context';
import { ModalContext } from '../../../../store/modal-context/modal-context';
import { getTask } from '../../../../api/task';



export default function PanelCard({ activity }) {
  const { openModal } = useContext(AppContext);
  const { loader } = useContext(ModalContext);
  let content = null;
  let finalDate = null;
  let status = null;

  const queryConfigMap = {
    TASK: {
      queryFn: getTask,
      getParams: ({ signal, activity }) => ({
        signal,
        id: activity.id,
        instanceId: activity.task.instance.id ?? null,
      }),
    },
  };
  const defaultQueryConfig = {
    queryFn: getActivity,
    getParams: ({ signal, activity }) => ({ signal, activityId: activity.id }),
  };
  const { queryFn, getParams } = queryConfigMap[activity.type] || defaultQueryConfig;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [activity.type.toLowerCase(), activity.id],
    queryFn: ({ signal }) => queryFn(getParams({ signal, activity })),
    enabled: false,
  });

  function handleClick(type) {
    openModal('UPDATE', String(type).toUpperCase());
    refetch();
  }

  if (activity.type === 'TASK') {
    finalDate = new Date(activity.task.instance.finalDate);
    status = activity.task.instance.status;
    content = <TaskCard task={activity.task} />
  };

  useEffect(() => {
    if (!isLoading && data) {
      console.log('Log DATA no Card.jsx')
      const data1 = {...data};
      console.log(data1)
      loader(data);
    }
  }, [data, isLoading]);

  const bg = STATES_CARD_COLORS[status]?.cardColor;

  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: bg }}
      onClick={() => handleClick(activity.type)}
    >
      <div className={styles.header}>
        <h3>{activity.title}</h3>
      </div>
      <p className={styles.description}>{activity.description}</p>
      {activity.type === "TASK" && <TaskCard task={activity.task} />}
      <div className={styles.keywords}>
        {activity.keywords.map((kw, i) => (
          <KeywordTag keyword={kw} key={i} />
        ))}
      </div>
      <div className={styles.dates}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <p>
          {new Date(activity.task.instance.finalDate).toLocaleDateString(
            "pt-br",
            { day: "2-digit", month: "long", year: "numeric" }
          )}
        </p>
      </div>
    </div>
  );
}