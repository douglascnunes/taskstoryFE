import { compareDatesOnly, isOnWeek } from "../date";
import { STATUS } from "../enum";


function taskCopy(activity, finalDate) {
  return {
    ...activity,
    task: {
      ...activity.task,
      instance: {
        finalDate: new Date(finalDate),
        status: STATUS[2], // TODO
        completedOn: null,
        stepCompletionStatus: [],
        // priorityEvolved: 0,
        taskId: activity.task.id
      }
    }
  };
};


export function generateTaskInstances(activity, startOverviewDate, endOverviewDate) {
  const { task, createdAt } = activity;
  const { taskInstances, endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod } = task;

  if (taskInstances.length === 0) {
    if (endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
      return [taskCopy(activity, new Date(endPeriod))];
    };


    if (frequenceIntervalDays) {
      const activityInstances = [];

      const current = new Date(startPeriod || createdAt);
      const overviewStart = new Date(startOverviewDate);
      while (current < overviewStart) {
        current.setDate(current.getDate() + frequenceIntervalDays);
      };

      const taskEnd = endPeriod ? new Date(endPeriod) : null;
      const overviewEnd = new Date(endOverviewDate);
      const end = taskEnd && taskEnd < overviewEnd ? taskEnd : overviewEnd;

      while (current <= end) {
        activityInstances.push(taskCopy(activity, new Date(current)));
        current.setDate(current.getDate() + frequenceIntervalDays);
      };
      return activityInstances;
    };


    if (frequenceWeeklyDays && frequenceWeeklyDays.length > 0) {
      const activityInstances = [];

      const current = new Date(startPeriod || createdAt);
      const overviewStart = new Date(startOverviewDate);
      while (current < overviewStart) {
        current.setDate(current.getDate() + frequenceIntervalDays);
      };

      const taskEnd = endPeriod ? new Date(endPeriod) : null;
      const overviewEnd = new Date(endOverviewDate);
      const end = taskEnd && taskEnd < overviewEnd ? taskEnd : overviewEnd;

      while (current <= end) {
        if (frequenceWeeklyDays.includes(current.getDay())) {
          activityInstances.push(taskCopy(activity, new Date(current)));
        }
        current.setDate(current.getDate() + 1);
      }

      return activityInstances;
    }
  };

  return null;
};


export function updateTaskStatus(activity) {
  const today = new Date();
  const { task } = activity;
  const completedOn = task.instance.completedOn;

  if (compareDatesOnly(new Date(task.instance.finalDate), today) < 0) {
    if (completedOn === null) return STATUS[3]; // TODO_LATE
    // if (current === STATUS[4]) return STATUS[5]; // WAITING → WAITING_LATE
    // if (current === STATUS[6]) return STATUS[7]; // DOING → DOING_LATE
  };

  return STATUS[2]; // TODO
};


export function isTaskLate(activity) {
  return activity.task.instance.status === STATUS[3]
};


export function isTaskToday(activity) {
  const today = new Date();
  return compareDatesOnly(new Date(activity.task.instance.finalDate), today) === 0;
}


export function isTaskOnWeek(activity) {
  return isOnWeek(activity.task.instance.finalDate);
}