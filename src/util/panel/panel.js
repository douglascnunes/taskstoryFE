import { getYearMonthNumber, isOnMonth } from "../date";
import { CONDICTION, DIFFICULTY_VALUES, IMPORTANCE_VALUES, MONTHS_NAME, PRIORITY } from "../enum.jsx";
import { generateTaskInstances, isTaskLate, isTaskOnWeek, isTaskToday, updateTaskCondiction } from "./task";


export function generateInstances(activities, startOverviewDate, endOverviewDate) {
  let activityInstances = [];

  activities.forEach(activity => {
    if (activity.type === "TASK") {
      const instance = generateTaskInstances(activity, startOverviewDate, endOverviewDate);
      if (instance) {
        activityInstances.push(...instance);
      };
    };
  });

  return activityInstances;
};



export function updateCondiction(activityInstances) {

  activityInstances.forEach(activity => {

    if (activity.type === "TASK") {
      activity.task.instance.condiction = updateTaskCondiction(activity);
    };
  });

  return activityInstances;
};




export function filterActivities(activities, filterCondictions, filterPriorities) {
  let filterActivities = activities;

  if (filterCondictions.length > 0) {
    filterActivities = activities.filter(activity => {
      if (activity.type === 'TASK') {
        return filterCondictions.includes(activity.task.instance.condiction);
      }
    });

    if (filterPriorities.length > 0) {
      filterActivities = filterActivities.filter(activity => {
        return filterPriorities.includes(activity.priority[0]);
      }
      );
    }
  }

  return filterActivities;
};



function orderByPriority(activities) {
  return activities.sort((a, b) => b.priority[1][5] - a.priority[1][5]);
}

function orderByCondiction(activities) {
  return activities.sort((a, b) => CONDICTION[b.task.instance.condiction][4] - CONDICTION[a.task.instance.condiction][4]);
}


export function orderActivities(activityInstances) {
  const activitiesByPriority = orderByPriority(activityInstances);
  const activitiesByCondiction = orderByCondiction(activitiesByPriority);

  return activitiesByCondiction;
}



export function filterLateActivities(activityInstances) {
  let activitiesLate = [];
  let remainingActivities = [];

  activityInstances.forEach(activity => {
    if (activity.type === 'TASK') {
      if (isTaskLate(activity)) {
        activitiesLate.push(activity);
      }
      else {
        remainingActivities.push(activity);
      }
    };
  });
  return [activitiesLate, remainingActivities];
};



export function filterPriorityActivities(activityInstances) {
  const activitiesPriority = [];
  const remainingActivities = [];

  activityInstances.forEach(activity => {
    const importanceValue = IMPORTANCE_VALUES[activity.importance][1];
    const difficultyValue = DIFFICULTY_VALUES[activity.difficulty][1];
    const priorityValue = (importanceValue + difficultyValue) / 2;
    const isMaxOrUrgent = ['MAXIMUM', 'URGENT'].some(key => {
      const [, min, max] = PRIORITY[key];
      return priorityValue >= min && priorityValue <= max;
    });

    if (isMaxOrUrgent && activity.type === 'TASK') {
      activitiesPriority.push(activity);
    }
    else {
      remainingActivities.push(activity);
    };
  });

  return [activitiesPriority, remainingActivities];
};




export function filterTodayActivities(activityInstances) {
  let activitiesToday = [];
  let remainingActivities = [];

  activityInstances.forEach(activity => {
    if (activity.type === 'TASK') {
      if (isTaskToday(activity)) {
        activitiesToday.push(activity);
      }
      else {
        remainingActivities.push(activity);
      }
    };
  });
  return [activitiesToday, remainingActivities];
};



export function filterWeekActivities(activityInstances) {
  let activitiesWeek = [];
  let remainingActivities = [];

  activityInstances.forEach(activity => {
    if (activity.type === 'TASK') {
      if (isTaskOnWeek(activity)) {
        activitiesWeek.push(activity);
      }
      else {
        remainingActivities.push(activity);
      }
    };
  });
  return [activitiesWeek, remainingActivities];
};




export function filterMonthActivities(activityInstances, startOverviewDate, endOverviewDate) {
  let refDate = new Date(startOverviewDate);
  let endOverDate = new Date(endOverviewDate);
  let remainingActivities = [];
  let activitiesMonths = [];

  while (getYearMonthNumber(refDate) <= getYearMonthNumber(endOverDate)) {
    remainingActivities = [];
    const month = {
      name: MONTHS_NAME[refDate.getMonth()],
      date: {
        month: refDate.getMonth(),
        year: refDate.getFullYear()
      },
      activities: []
    };
    activityInstances.forEach(activity => {
      if (activity.type === 'TASK') {
        if (isOnMonth(new Date(activity.task.instance.finalDate),
          refDate.getMonth(), refDate.getFullYear(), startOverviewDate, endOverviewDate)) {
          month.activities.push(activity);
        }
        else {
          remainingActivities.push(activity);
        };
      };
    });
    activitiesMonths.push(month);
    refDate.setMonth(refDate.getMonth() + 1);
    activityInstances = remainingActivities;
  };
  return activitiesMonths;
};