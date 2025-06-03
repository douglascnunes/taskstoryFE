import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './Card.module.css';
import KeywordTag from '../KeywordTag';
import TaskCard from './task/TaskCard';

import { AppContext } from '../../../../store/app-context';
import { ModalContext } from '../../../../store/modal-context/modal-context';
import { getActivity } from '../../../../api/activities';
import { getTask } from '../../../../api/task';
import { ACTIVITY_TYPE, CONDICTION } from '../../../../util/enum.jsx';
import PriorityTag from '../PriorityTag';
import CondictionTag from './CondictionTag.jsx';
import TrashButton from './TrashButton.jsx';


const activityConfigMap = {
  TASK: {
    component: (activity) => <TaskCard task={activity.task} />,
    getFinalDate: (activity) => new Date(activity.task.instance.finalDate),
    getCondiction: (activity) => activity.task.instance.condiction,
    getTask: (activity) => activity.task,
    queryFn: getTask,
    getParams: ({ signal, activity }) => ({
      signal,
      id: activity.id,
      instanceId: activity.task.instance.id ?? null,
    }),
    loaderHandler: (loader, result, activity) => {
      if (result.data) loader(result.data, activity.task.instance);
    },
  },
  DEFAULT: {
    component: () => null,
    getFinalDate: () => null,
    getCondiction: () => null,
    queryFn: getActivity,
    getParams: ({ signal, activity }) => ({ signal, activityId: activity.id }),
    loaderHandler: () => { },
  }
  // PROJECT: {
  //   component: (activity) => <ProjectCard project={activity.project} />,
  //   getFinalDate: (activity) => new Date(activity.project.deadline),
  //   getCondiction: (activity) => activity.project.status,
  //   queryFn: getProject,
  //   getParams: ({ signal, activity }) => ({ signal, id: activity.id }),
  //   loaderHandler: (loader, result, activity) => {
  //     if (result.data) loader(result.data);
  //   },
  // },
};

export default function PanelCard({ activity }) {
  const { openModal } = useContext(AppContext);
  const { loader } = useContext(ModalContext);

  const config = activityConfigMap[activity.type] || activityConfigMap['DEFAULT'];

  const { refetch } = useQuery({
    queryKey: [activity.type.toLowerCase(), activity.id],
    queryFn: ({ signal }) => config.queryFn(config.getParams({ signal, activity })),
    enabled: false,
  });

  async function handleClick() {
    const result = await refetch();
    config.loaderHandler(loader, result, activity);
    openModal('UPDATE', activity.type.toUpperCase());
  }

  const finalDate = config.getFinalDate?.(activity);
  const condiction = config.getCondiction?.(activity);
  const bgColor = condiction ? CONDICTION[condiction]?.[3] : '#ffffff';

  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >
      <div className={styles.header}>
        <h3>{activity.title}</h3>
        <div className={styles.iconLabel}>
          {ACTIVITY_TYPE[activity.type].icon}
          <p className={styles.type}>
            {ACTIVITY_TYPE[activity.type].label}
          </p>
        </div>
      </div>

      <div className={styles.status}>
        <CondictionTag task={config.getTask(activity)} />
        <TrashButton task={config.getTask(activity)} />
        <PriorityTag importance={activity.importance} difficulty={activity.difficulty} />
      </div>

      <p className={styles.description}>{activity.description}</p>

      {config.component(activity)}

      <div className={styles.keywords}>
        {activity.keywords.map((kw, i) => (
          <KeywordTag keyword={kw} key={i} />
        ))}
      </div>
      <div className={styles.footer}>
        {finalDate && (
          <div className={styles.dates}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 
              0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p>
              {finalDate.toLocaleDateString("pt-br", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </div>
    </div >
  );
}
