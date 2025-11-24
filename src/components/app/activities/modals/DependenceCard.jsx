import { useContext } from "react";
import { createTaskInstance, getTask } from "../../../../api/task";
import { ModalContext } from "../../../../store/modal-context/modal-context";
import { cleanObject } from "../../../../util/api-helpers/activity";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from './DependenceCard.module.css';
import KeywordTag from "../KeywordTag";
import { ACTIVITY_TYPE, CONDICTION } from "../../../../util/enum";
import { queryClient } from "../../../../api/queryClient";
import TaskCard from "../cards/task/TaskCard";
import { getActivity } from "../../../../api/activities";
import { AppContext } from "../../../../store/app-context";


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
};



export default function DependenceCard({ dependency, viewMode = "card" }) {
  const { setType } = useContext(AppContext);
  const { toggleDependencies } = useContext(ModalContext);

  const activity = dependency.activity;
  const finalDate = new Date(activity.task.instance.finalDate);
  const condiction = activity.task.instance.condiction;

  const { mutateAsync: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities'])
  });

  const bgColor = condiction ? CONDICTION[condiction]?.[3] : '#ffffff';

  const { loader } = useContext(ModalContext);

  const config = activityConfigMap[activity.type] || activityConfigMap['DEFAULT'];

  const { refetch } = useQuery({
    queryKey: [activity.type.toLowerCase(), activity.id],
    queryFn: ({ signal }) => config.queryFn(config.getParams({ signal, activity })),
    enabled: false,
  });


  async function handleClick(mode) {
    if (viewMode === "select" || mode === "select") {
      if (activity.type === "TASK" && !activity.task?.instance?.id) {
        const response = await createInstance({ taskId: activity.task.id, instance: cleanObject(activity.task.instance) });
        const updated = {
          ...activity,
          task: {
            ...activity.task,
            instance: response.instance,
            id: response.instance.taskId
          }
        };

        toggleDependencies("ACTIVITY", updated, null);
      } else {
        toggleDependencies("ACTIVITY", activity, null);
      }
    }

    else if (viewMode === "card" || mode === "card") {
      const result = await refetch();
      config.loaderHandler(loader, result, activity);
      setType(activity.type.toUpperCase());
    }
  }

  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: bgColor }}
      onClick={() => handleClick("card")}
    >
      {viewMode === "card" &&
        <div className={styles.trashArea} onClick={() => handleClick("select")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </div>
      }
      <div className={styles.header}>
        <h3 className={styles.title}>{activity.title}</h3>
        <div className={styles.iconLabel}>
          {ACTIVITY_TYPE[activity.type].icon}
          <p className={styles.type}>
            {ACTIVITY_TYPE[activity.type].label}
          </p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.keywords}>
          {activity.keywords.map((kw, i) => (
            <KeywordTag keyword={kw} key={i} viewMode="compact" />
          ))}
        </div>
        <div className={styles.date}>
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
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div >
  )
};