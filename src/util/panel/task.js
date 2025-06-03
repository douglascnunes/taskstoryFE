import { compareDatesOnly, isOnWeek } from "../date";
import { STATUS } from "../enum.jsx";


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

  const StepsId = activity.task.steps.map(step => step.id);
  const filteredStepsStatus = instance.stepCompletionStatus.filter(status => StepsId.includes(status));
  instance.stepCompletionStatus = filteredStepsStatus;

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
  const { taskInstances, endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod, deletedInstances } = task;


  if (endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
    let wasDeleted;
    if (deletedInstances && deletedInstances.length > 0) {
      wasDeleted = deletedInstances.some(deletedDate => {
        return compareDatesOnly(new Date(deletedDate), endPeriod) === 0;
      });
    };
    if (!wasDeleted) {
      if (taskInstances.length === 0) {
        return [taskCopy(activity, new Date(endPeriod))];
      }
      else {
        taskInstances[0].finalDate = new Date(endPeriod);
        return [structureTask(activity, 0)];
      }
    }
  };


  if (frequenceIntervalDays) {
    const activityInstances = [];

    const current = new Date(startPeriod || createdAt);
    const overviewStart = new Date(startOverviewDate);
    while (current < overviewStart) {
      current.setDate(current.getDate() + frequenceIntervalDays);
    }

    const taskEnd = endPeriod ? new Date(endPeriod) : null;
    const overviewEnd = new Date(endOverviewDate);
    const end = taskEnd && taskEnd < overviewEnd ? taskEnd : overviewEnd;

    const addedDates = [];

    while (current <= end) {
      let added = false;
      let wasDeleted;
      if (deletedInstances && deletedInstances.length > 0) {
        wasDeleted = deletedInstances.some(deletedDate => {
          return compareDatesOnly(new Date(deletedDate), current) === 0;
        });
      };
      if (!wasDeleted) {
        if (taskInstances.length > 0) {
          const index = taskInstances
            .findIndex(instance => compareDatesOnly(new Date(instance.finalDate), current) === 0);
          if (index !== -1) {
            activityInstances.push(structureTask(activity, index));
            addedDates.push(current.toDateString());
            added = true;
          }
        }

        if (!added) {
          activityInstances.push(taskCopy(activity, new Date(current)));
          addedDates.push(current.toDateString());
        }
      }
      current.setDate(current.getDate() + frequenceIntervalDays);
    }

    const remaining = taskInstances.filter(instance => {
      const instanceDate = new Date(instance.finalDate);
      return !addedDates.includes(instanceDate.toDateString());
    });

    for (const instance of remaining) {
      const index = taskInstances.findIndex(i =>
        compareDatesOnly(new Date(i.finalDate), new Date(instance.finalDate)) === 0
      );
      if (index !== -1) {
        activityInstances.push(structureTask(activity, index));
      }
    }

    return activityInstances;
  }


  if (frequenceWeeklyDays && frequenceWeeklyDays.length > 0) {
    const activityInstances = [];

    const addedDates = [];

    const current = new Date(startPeriod || createdAt);
    const overviewStart = new Date(startOverviewDate);
    while (current < overviewStart) {
      current.setDate(current.getDate() + frequenceIntervalDays);
    };

    const taskEnd = endPeriod ? new Date(endPeriod) : null;
    const overviewEnd = new Date(endOverviewDate);
    const end = taskEnd && taskEnd < overviewEnd ? taskEnd : overviewEnd;

    while (current <= end) {
      let added = false;
      let wasDeleted;
      if (deletedInstances && deletedInstances.length > 0) {
        wasDeleted = deletedInstances.some(deletedDate => {
          return compareDatesOnly(new Date(deletedDate), current) === 0;
        });
      };
      if (!wasDeleted && frequenceWeeklyDays.includes(current.getDay())) {
        if (taskInstances.length > 0) {
          const index = taskInstances
            .findIndex(instance => compareDatesOnly(new Date(instance.finalDate), current) === 0);
          if (index !== -1) {
            activityInstances.push(structureTask(activity, index));
            addedDates.push(current.toDateString());
            added = true;
          }
        }

        if (!added) {
          activityInstances.push(taskCopy(activity, new Date(current)));
          addedDates.push(current.toDateString());
        }
      }
      current.setDate(current.getDate() + 1);
    }

    const remaining = taskInstances.filter(instance => {
      const instanceDate = new Date(instance.finalDate);
      return !addedDates.includes(instanceDate.toDateString());
    });

    for (const instance of remaining) {
      const index = taskInstances.findIndex(i =>
        compareDatesOnly(new Date(i.finalDate), new Date(instance.finalDate)) === 0
      );
      if (index !== -1) {
        activityInstances.push(structureTask(activity, index));
      }
    }

    return activityInstances;
  }


  return null;
};



export function updateTaskCondiction(activity) {
  // console.log("updateTaskCondiction", activity);
  const today = new Date();
  const { task } = activity;
  const { completedOn, stepCompletionStatus } = task.instance;

  if (completedOn) {
    if (compareDatesOnly(new Date(completedOn), new Date(task.instance.finalDate)) <= 0) return 'DONE';
    else return 'DONE_LATE';
  };

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