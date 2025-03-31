import Section from "./Section";
import style from './Panel.module.css';
import { isToday, isWithinInterval, addDays } from 'date-fns';
import { SPECIALIZATION_STATE, SECTION_NAMES } from "../../util/enum";

export default function Panel({ activities, mode }) {
  const today = new Date();

  // Update currentState of activities
  activities.forEach(activity => {
    activity.task?.taskInstances.forEach(instance => {
      const finalDate = new Date(instance.finalDate);
      if (finalDate < today && instance.completedOn === null) {
        if (instance.currentState === SPECIALIZATION_STATE[1]) { // 'TODO'
          instance.currentState = SPECIALIZATION_STATE[2]; // 'TODO_LATE'
          console.log("Updated currentState from TODO to TODO_LATE for instance:", instance);
        } else if (instance.currentState === SPECIALIZATION_STATE[3]) { // 'WAITING'
          instance.currentState = SPECIALIZATION_STATE[4]; // 'WAITING_LATE'
          console.log("Updated currentState from WAITING to WAITING_LATE for instance:", instance);
        } else if (instance.currentState === SPECIALIZATION_STATE[5]) { // 'DOING'
          instance.currentState = SPECIALIZATION_STATE[6]; // 'DOING_LATE'
          console.log("Updated currentState from DOING to DOING_LATE for instance:", instance);
        }
      }
    });
  });

  const activitiesLate = activities.filter(activity => {
    console.log(activity.task?.taskInstances[0].currentState)
    return activity.task?.taskInstances[0].currentState === SPECIALIZATION_STATE[2] // 'TODO_LATE'
  });

  const activitiesPriority = activities.filter(activity =>
    activity.priorityId === 5 || activity.priorityId === 6
  );

  const activitiesToday = activities.filter(activity =>
    activity.task?.taskInstances.some(instance => isToday(new Date(instance.finalDate)))
  );

  const activitiesWeek = activities.filter(activity =>
    activity.task?.taskInstances.some(instance =>
      isWithinInterval(new Date(instance.finalDate), {
        start: addDays(today, 1),
        end: addDays(today, 7),
      })
    )
  );

  if (mode === "overview") {
    return (
      <div className={style.panel}>
        <Section activities={activitiesLate} name={SECTION_NAMES[0]} />
        <Section activities={activitiesPriority} name={SECTION_NAMES[1]} />
        <Section activities={activitiesToday} name={SECTION_NAMES[2]} />
        <Section activities={activitiesWeek} name={SECTION_NAMES[3]} />
      </div>
    );
  }

  return (
    <h1>PANEL</h1>
  );
};