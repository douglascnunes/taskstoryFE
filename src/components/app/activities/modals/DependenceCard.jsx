import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./DependenceCard.module.css";

import { ModalContext } from "../../../../store/modal-context/modal-context";
import { AppContext } from "../../../../store/app-context";

import { createTaskInstance, getTask } from "../../../../api/task";
import { getActivity, upsertDependencies } from "../../../../api/activities";
import { queryClient } from "../../../../api/queryClient";

import { cleanObject, preProcessDependency } from "../../../../util/api-helpers/activity";
import { ACTIVITY_TYPE, CONDICTION } from "../../../../util/enum";

import { computeNextDependencies } from "../../../../store/modal-context/modal-activity-context";

import KeywordTag from "../KeywordTag";
import TaskCard from "../cards/task/TaskCard";


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



export default function DependenceCard({
  depActivityID,
  dependencies,
  viewMode = "card",
  type = "today",
  depCreateInstance = null,
  activity = null,
  description = null,
  instanceId = null
}) {

  const { toggleDependencies, loader } = useContext(ModalContext);
  const { setType } = useContext(AppContext);

  const { mutate: mutateUpsertDependencies } = useMutation({
    mutationFn: upsertDependencies,
    onSuccess: () => queryClient.invalidateQueries(['activities', 'overview']),
  });

  const { mutateAsync: createInstance } = useMutation({
    mutationFn: createTaskInstance,
    onSuccess: () => queryClient.invalidateQueries(['activities'])
  });

  let bgColor = '#ffffff';

  const dateStringConfig = viewMode !== "card"
    ? {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
    : {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };

  const classMap = {
    footer: {
      card: styles.cardFooter,
      footer: styles.selectFooter,
    },
    container: {
      card: styles.cardContainer,
      select: styles.selectContainer,
      default: styles.cardContainer,
    },
    title: {
      card: styles.cardTitle,
      select: styles.selectTitle,
    },
    header: {
      card: styles.cardHeader,
      select: styles.selectHeader,
    }
  }

  // CONFIFURATION BASED ON ACTIVITY TYPE
  let finalDate = null;
  let config = null;

  if (type === "ACTIVITY") {
    config = activityConfigMap[activity.type] || activityConfigMap['DEFAULT'];
    finalDate = config.getFinalDate(activity);
    const condiction = config.getCondiction(activity);
    bgColor = condiction ? CONDICTION[condiction]?.[3] : '#ffffff';
  }

  const { refetch } = useQuery({
    queryKey: [activity.type.toLowerCase(), activity.id],
    queryFn: ({ signal }) => config.queryFn(config.getParams({ signal, activity })),
    enabled: false,
  });


  async function handleClick(mode) {
    if (viewMode === "select" || mode === "select") {

      let activityToUse = activity;

      // Se a dependência não estiver instânciada
      if (activity.type === "TASK" && !activity.task?.instance?.id) {
        const response = await createInstance({
          taskId: activity.task.id,
          instance: cleanObject(activity.task.instance),
        });
        activityToUse = {
          ...activity,
          task: {
            ...activity.task,
            instance: response.instance,
            id: response.instance.taskId,
          },
        };
      }

      toggleDependencies("ACTIVITY", activityToUse, null);

      // Se a Dependênte não estiver Instânciada
      if (!instanceId) {
        instanceId = await depCreateInstance()
      }

      const nextDependencies = computeNextDependencies(
        { dependencies },
        { type: "ACTIVITY", activity: activityToUse, description: null }
      );
      mutateUpsertDependencies({
        activityId: depActivityID,
        dependencies: preProcessDependency(instanceId, nextDependencies || []),
      });
    }

    else if (viewMode === "card" || mode === "card") {
      const result = await refetch();
      config.loaderHandler(loader, result, activity);
      setType(activity.type.toUpperCase());
    }
  }


  return (
    <div
      className={`${classMap.container['default']} ${classMap.container[viewMode]}`}
      style={{ backgroundColor: bgColor }}
      onClick={() => handleClick("card")}
    >
      <div className={`${classMap.header[viewMode]}`}>
        <h3 className={`${classMap.title[viewMode]}`}>{activity.title}</h3>
        <div>
          {ACTIVITY_TYPE[activity.type].icon}
          {viewMode === "select" && <p className={styles.type}>{ACTIVITY_TYPE[activity.type].label}</p>}
        </div>
      </div>

      <div className={`${classMap.footer[viewMode]}`}>
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
                  day: dateStringConfig.day,
                  month: dateStringConfig.month,
                  year: dateStringConfig.year,
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div >
  )
};