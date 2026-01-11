import { compareDatesOnly, isOnWeek } from "../date";
import { STATUS } from "../enum.jsx";
import { calcPriority } from "./activity.js";


function taskCopy(activity, finalDate) {
  const priority = calcPriority(activity);

  return {
    ...activity,
    priority,
    task: {
      ...activity.task,
      instance: {
        finalDate: finalDate,
        status: STATUS[0], // ACTIVE
        condiction: "TODO",
        completedOn: null,
        stepCompletionStatus: [],
        taskId: activity.task.id
      }
    }
  };
};


function structureTask(activity, index) {
  const instance = activity.task.instance[index];

  const StepsId = activity.task.steps.map(step => step.id);
  const filteredStepsStatus = instance.stepCompletionStatus.filter(status => StepsId.includes(status));
  instance.stepCompletionStatus = filteredStepsStatus;
  const priority = calcPriority(activity);

  const newTask = {
    ...activity,
    priority,
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

  if (newTask.dependencies && Array.isArray(newTask.dependencies)) {
    newTask.dependencies = newTask.dependencies
      .map(dep => {
        if (dep && dep.type === "TASK") {
          if (dep.dependency && dep.dependency.instanceId === instance.id) {
            return dep;
          }
        }
        return null;
      })
      .filter(dep => dep !== null);
  } else {
    newTask.dependencies = [];
  }

  return newTask;
}


export function generateTaskInstances(activity, startOverviewDate, endOverviewDate) {
  const { task, createdAt } = activity;
  const { instance, endPeriod, frequenceIntervalDays, frequenceWeeklyDays, startPeriod, deletedInstances } = task;

  // if (!startOverviewDate) {
  //   startOverviewDate = new Date();
  //   startOverviewDate.setMonth(startOverviewDate.getMonth() - 2);
  // }
  // if (!endOverviewDate) {
  //   endOverviewDate = new Date();
  //   endOverviewDate.setMonth(endOverviewDate.getMonth() + 2);
  // }

  if (endPeriod && !frequenceIntervalDays && !frequenceWeeklyDays) {
    let wasDeleted;
    if (deletedInstances && deletedInstances.length > 0) {
      wasDeleted = deletedInstances.some(deletedDate => {
        return compareDatesOnly(new Date(deletedDate), endPeriod) === 0;
      });
    };
    if (!wasDeleted) {
      if (instance.length === 0) {
        return [taskCopy(activity, new Date(endPeriod))];
      }
      else {
        instance[0].finalDate = new Date(endPeriod);
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
        if (instance.length > 0) {
          const index = instance
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

    const remaining = instance.filter(instance => {
      const instanceDate = new Date(instance.finalDate);
      return !addedDates.includes(instanceDate.toDateString());
    });

    for (const remainingInstance of remaining) {
      const index = activity.task.instance.findIndex(i =>
        compareDatesOnly(
          new Date(i.finalDate),
          new Date(remainingInstance.finalDate)
        ) === 0
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
        if (instance.length > 0) {
          const index = instance
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

    const remaining = instance.filter(instance => {
      const instanceDate = new Date(instance.finalDate);
      return !addedDates.includes(instanceDate.toDateString());
    });

    for (const instance of remaining) {
      const index = instance.findIndex(i =>
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
  const today = new Date();
  const { task } = activity;
  const { completedOn, stepCompletionStatus, finalDate } = task.instance;

  // Já concluída
  if (completedOn) {
    return compareDatesOnly(new Date(completedOn), new Date(finalDate)) <= 0
      ? 'DONE'
      : 'DONE_LATE';
  };

  const hasDependencies = activity.dependencies && activity.dependencies.length > 0;
  let allDependenciesDone = false;

  if (hasDependencies) {
    allDependenciesDone = activity.dependencies.every(dep => {
      if (dep.type === "TASK") {
        return dep.task?.instance[0]?.completedOn !== null &&
          dep.task?.instance[0]?.completedOn !== undefined;
      }
    });
  }

  // Fluxo principal
  const isLate = compareDatesOnly(new Date(finalDate), today) < 0;

  if (hasDependencies && !allDependenciesDone) {
    return isLate ? 'WAITING_LATE' : 'WAITING';
  }

  if (stepCompletionStatus && stepCompletionStatus.length > 0) {
    return isLate ? 'DOING_LATE' : 'DOING';
  }

  return isLate ? 'TODO_LATE' : 'TODO';
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