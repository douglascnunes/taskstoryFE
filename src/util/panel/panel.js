import { getYearMonthNumber, isOnMonth } from "../date";
import { DIFFICULTY_VALUES, IMPORTANCE_VALUES, MONTHS_NAME, PRIORITY_VALUES } from "../enum";
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



export function updateStatus(activityInstances) {

  activityInstances.forEach(activity => {

    if (activity.type === "TASK") {
      activity.task.instance.status = updateTaskCondiction(activity);
    };
  });

  return activityInstances;
};



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
      const [, min, max] = PRIORITY_VALUES[key];
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