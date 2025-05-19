import { compareDatesOnly, isOnWeek } from "../date";
import { CONDICTION, STATUS } from "../enum";


function taskCopy(activity, finalDate) {
  return {
    ...activity,
    task: {
      ...activity.task,
      instance: {
        finalDate: new Date(finalDate),
        status: STATUS[0], // ACTIVE
        condiction: CONDICTION[2], // TODO
        completedOn: null,
        stepCompletionStatus: [],
        // priorityEvolved: 0,
        taskId: activity.task.id
      }
    }
  };
};

function structureTask(activity) {
  const instance = activity.task.taskInstances[0];
  const newTask = {
    ...activity,
    task: {
      ...activity.task,
      instance: {
        id: instance.id ?? null,
        finalDate: new Date(instance.finalDate),
        status: instance.status ?? STATUS[0], // ACTIVE
        condiction: CONDICTION[2], // TODO
        completedOn: instance.completedOn ?? null,
        stepCompletionStatus: instance.stepCompletionStatus ?? [],
        taskId: activity.task.id
      }
    }
  };
  delete newTask.task.taskInstances
  return newTask
};


export function generateTaskInstances(activity, startOverviewDate, endOverviewDate) {
  // console.log(activity)
  const { task, createdAt } = activity;
  const { taskInstances, endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod } = task;

  if (endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
    if (taskInstances.length === 0) {
      return [taskCopy(activity, new Date(endPeriod))];
    }
    else {
      return [structureTask(activity)]
    }
  }


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


  return null;
};


export function updateTaskCondiction(activity) {
  const today = new Date();
  const { task } = activity;
  const completedOn = task.instance.completedOn;

  if (compareDatesOnly(new Date(task.instance.finalDate), today) < 0) {
    if (completedOn === null) return CONDICTION[3]; // TODO_LATE
    // if (current === CONDICTION[4]) return CONDICTION[5]; // WAITING → WAITING_LATE
    // if (current === CONDICTION[6]) return CONDICTION[7]; // DOING → DOING_LATE
  };

  return CONDICTION[2]; // TODO
};


export function isTaskLate(activity) {
  return activity.task.instance.condiction === CONDICTION[3]
};


export function isTaskToday(activity) {
  const today = new Date();
  return compareDatesOnly(new Date(activity.task.instance.finalDate), today) === 0;
}


export function isTaskOnWeek(activity) {
  return isOnWeek(activity.task.instance.finalDate);
}