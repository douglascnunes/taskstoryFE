import Section from "./Section";
import style from './Panel.module.css';
import { addDays } from 'date-fns';
import {
  SPECIALIZATION_STATE,
  SECTION_NAMES,
  IMPORTANCE_VALUES,
  DIFFICULTY_VALUES,
  PRIORITY_VALUES
} from "../../../util/enum";


function formatToISO(date) {
  return new Date(date).toISOString().slice(0, 10); // "2025-06-04"
}


function taskInstanceCopy(activity, instance) {
  return {
    ...activity,
    task: {
      ...activity.task,
      taskInstances: [instance]
    }
  }
};


export default function Panel({ activities, mode, startdate, finaldate }) {
  const today = formatToISO(new Date());


  activities.forEach(activity => {
    activity.task?.taskInstances.forEach(instance => {
      if (formatToISO(new Date(instance.finalDate)) < today) {
        if (instance.currentState === SPECIALIZATION_STATE[1]) { // 'TODO'
          instance.currentState = SPECIALIZATION_STATE[2]; // 'TODO_LATE'
        } else if (instance.currentState === SPECIALIZATION_STATE[3]) { // 'WAITING'
          instance.currentState = SPECIALIZATION_STATE[4]; // 'WAITING_LATE'
        } else if (instance.currentState === SPECIALIZATION_STATE[5]) { // 'DOING'
          instance.currentState = SPECIALIZATION_STATE[6]; // 'DOING_LATE'
        }
      }
    });
  });

  let activitiesLate = [];
  activities.forEach(activity => {
    if (activity.activityType === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (instance.currentState === SPECIALIZATION_STATE[2]) { // 'TODO_LATE'
          activitiesLate.push(taskInstanceCopy(activity, instance));
        }
      })
    }
  });

  let activitiesPriority = [];
  activities.forEach(activity => {
    // 1) calcula os valores numéricos
    const importanceValue = IMPORTANCE_VALUES[activity.importance][1];
    const difficultyValue = DIFFICULTY_VALUES[activity.difficulty][1];
    const priorityValue = (importanceValue + difficultyValue) / 2;
  
    // 2) verifica se entra em MAXIMUM ou URGENT
    const isMaxOrUrgent = ['MAXIMUM', 'URGENT'].some(key => {
      const [, min, max] = PRIORITY_VALUES[key];
      // no caso de URGENT, min e max são iguais (999) — aqui usamos <= para incluir
      return priorityValue >= min && priorityValue <= max;
    });
  
    if (isMaxOrUrgent && activity.activityType === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        activitiesPriority.push(taskInstanceCopy(activity, instance));
      });
    }
  });


  let activitiesToday = [];
  activities.forEach(activity => {
    if (activity.activityType === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (formatToISO(new Date(activity.task?.taskInstances[0].finalDate)) === today) {
          activitiesToday.push(taskInstanceCopy(activity, instance));
        }
      })
    }
  });

  let activitiesWeek = [];
  activities.forEach(activity => {
    if (activity.activityType === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (new Date(instance.finalDate) > new Date(today) &&
          new Date(instance.finalDate) <= addDays(new Date(today), 7)) {
          activitiesWeek.push(taskInstanceCopy(activity, instance));
        }
      })
    }
  });


  if (mode === "overview") {
    return (
      <>
        <div className={style.panel}>
          <Section activities={activitiesLate} name={SECTION_NAMES[0]} />
          <Section activities={activitiesPriority} name={SECTION_NAMES[1]} />
          <Section activities={activitiesToday} name={SECTION_NAMES[2]} />
          <Section activities={activitiesWeek} name={SECTION_NAMES[3]} />
        </div>
      </>
    );
  }

  return (
    <h1>PANEL</h1>
  );
};