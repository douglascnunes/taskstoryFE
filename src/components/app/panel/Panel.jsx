import Section from "./Section";
import style from './Panel.module.css';
import { addDays } from 'date-fns';
import {
  SPECIALIZATION_STATUS,
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

function createInstance(type, finalDate, id) {
  if (type === "TASK") {
    return {
      currentStatus: SPECIALIZATION_STATUS[1], // TODO
      completedOn: null,
      finalDate: finalDate,
      stepCompletionStatus: null,
      priorityEvolved: 0,
      taskId: id
    };
  };
};


function groupActivitiesByPastMonths(activities, startOverviewDate) {
  const groupedMonths = [];
  let referenceDate = new Date();
  const overviewStart = new Date(startOverviewDate);

  // Primeiro, junta todas as instâncias em uma lista
  const allInstances = [];

  activities.forEach(activity => {
    if (activity.type !== "TASK") return;

    activity.task.taskInstances.forEach(instance => {
      allInstances.push({
        finalDate: new Date(instance.finalDate),
        instance: taskInstanceCopy(activity, instance),
      });
    });
  });

  // Agora, agrupa mês a mês
  while (referenceDate >= overviewStart) {
    const currentYear = referenceDate.getFullYear();
    const currentMonth = referenceDate.getMonth(); // 0-11

    const monthActivities = allInstances
      .filter(({ finalDate }) => (
        finalDate.getFullYear() === currentYear &&
        finalDate.getMonth() === currentMonth
      ))
      .map(({ instance }) => instance);

    groupedMonths.push({
      name: `${formatMonthName(currentMonth)} ${currentYear}`, // Ex: "Abril 2025"
      activities: monthActivities,
    });

    // Anda um mês para trás
    referenceDate.setMonth(referenceDate.getMonth() - 1);
  }

  return groupedMonths;
}

function formatMonthName(monthNumber) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  return months[monthNumber];
}





export default function Panel({ activities, mode, startOverviewDate, endOverviewDate }) {
  const today = formatToISO(new Date());

  activities.forEach(activity => {
    if (activity.type === "TASK") {
      const { task } = activity;

      const { taskInstances = [], endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod, createdAt, id } = task;

      if (taskInstances.length === 0 && endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
        task.taskInstances = [createInstance("TASK", endPeriod, id)];
        return;
      }

      if (frequenceIntervalDays) {
        const start = new Date(startPeriod || createdAt);
        const end = new Date(endPeriod || endOverviewDate);
        const overviewStart = new Date(startOverviewDate);
        const instances = [];

        while (start < overviewStart) {
          start.setDate(start.getDate() + frequenceIntervalDays);
        }
        let referenceDate = new Date(start);

        while (referenceDate <= end) {
          instances.push(createInstance("TASK", formatToISO(referenceDate), id));
          referenceDate.setDate(referenceDate.getDate() + frequenceIntervalDays);
        }

        task.taskInstances = instances;
      }
    }
  });


  // UPDTATE CURRENT ACTIVITY STATE
  activities.forEach(activity => {
    if (activity.type === "TASK")
      activity.task?.taskInstances.forEach(instance => {
        if (formatToISO(new Date(instance.finalDate)) < today) {
          if (instance.currentStatus === SPECIALIZATION_STATUS[1]) { // 'TODO'
            instance.currentStatus = SPECIALIZATION_STATUS[2]; // 'TODO_LATE'
          } else if (instance.currentStatus === SPECIALIZATION_STATUS[3]) { // 'WAITING'
            instance.currentStatus = SPECIALIZATION_STATUS[4]; // 'WAITING_LATE'
          } else if (instance.currentStatus === SPECIALIZATION_STATUS[5]) { // 'DOING'
            instance.currentStatus = SPECIALIZATION_STATUS[6]; // 'DOING_LATE'
          }
        }
      });
  });


  let activitiesLate = [];
  activities.forEach(activity => {
    if (activity.type === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (instance.currentStatus === SPECIALIZATION_STATUS[2]) { // 'TODO_LATE'
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

    if (isMaxOrUrgent && activity.type === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        activitiesPriority.push(taskInstanceCopy(activity, instance));
      });
    }
  });


  let activitiesToday = [];
  activities.forEach(activity => {
    if (activity.type === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (formatToISO(new Date(instance.finalDate)) === today) {
          activitiesToday.push(taskInstanceCopy(activity, instance));
        };
      });
    };
  });

  let activitiesWeek = [];
  activities.forEach(activity => {
    if (activity.type === 'TASK') {
      activity.task.taskInstances.forEach(instance => {
        if (new Date(instance.finalDate) > new Date(today) &&
          new Date(instance.finalDate) <= addDays(new Date(today), 7)) {
          activitiesWeek.push(taskInstanceCopy(activity, instance));
        }
      })
    }
  });


  const activitiesMonthsGone = groupActivitiesByPastMonths(activities, startOverviewDate);


  if (mode === "overview") {
    return (
      <>
        <div className={style.panel}>
          {activitiesMonthsGone.map(({ name, activities }, index) => (
            <Section key={index} activities={activities} name={name} />
          ))}
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