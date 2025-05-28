import { compareDatesOnly, isOnWeek } from "../date";
import { CONDICTION, STATUS } from "../enum";


function taskCopy(activity, finalDate) {
  return {
    ...activity,
    task: {
      ...activity.task,
      instance: {
        finalDate: finalDate,
        status: STATUS[0], // ACTIVE
        condiction: "TODO",
        completedOn: null,
        stepCompletionStatus: [],
        // priorityEvolved: 0,
        taskId: activity.task.id
      }
    }
  };
};

function structureTask(activity, index) {
  const instance = activity.task.taskInstances[index];
  const newTask = {
    ...activity,
    task: {
      ...activity.task,
      instance: {
        id: instance.id ?? null,
        finalDate: instance.finalDate,
        status: instance.status ?? STATUS[0], // ACTIVE
        condiction: "TODO",
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
  const { task, createdAt } = activity;
  const { taskInstances, endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod } = task;

  if (endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
    if (taskInstances.length === 0) {
      return [taskCopy(activity, new Date(endPeriod))];
    } else {
      const index = taskInstances.findIndex(instance =>
        compareDatesOnly(new Date(instance.finalDate), new Date(endPeriod)) === 0
      );

      if (index !== -1) {
        return [structureTask(activity, index)];
      } else {
        return [taskCopy(activity, new Date(endPeriod))];
      }
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
      if (taskInstances.length > 0) {
        const index = taskInstances
          .findIndex(instance => compareDatesOnly(new Date(instance.finalDate), current) === 0);
        if (index !== -1) {
          activityInstances.push(structureTask(activity, index));
        } else {
          activityInstances.push(taskCopy(activity, new Date(current)));
        }
      } else {
        activityInstances.push(taskCopy(activity, new Date(current)));
      }

      current.setDate(current.getDate() + frequenceIntervalDays);
    }

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
  const { completedOn, stepCompletionStatus } = task.instance;

  if (compareDatesOnly(new Date(task.instance.finalDate), today) < 0) {
    if (stepCompletionStatus.length > 0) return "DOING_LATE";
    if (completedOn === null) return "TODO_LATE";
  }
  else {
    if (stepCompletionStatus.length > 0) return "DOING";
  }

  return "TODO";
};


export function isTaskLate(activity) {
  const taskCondiction = activity.task.instance.condiction
  return taskCondiction === "TODO_LATE" || taskCondiction === "DOING_LATE"
};


export function isTaskToday(activity) {
  const today = new Date();
  return compareDatesOnly(new Date(activity.task.instance.finalDate), today) === 0;
}


export function isTaskOnWeek(activity) {
  return isOnWeek(activity.task.instance.finalDate);
}