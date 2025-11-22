import { STATUS } from "../enum";
import { calcPriority } from "../panel/activity";
import { updateTaskCondiction } from "../panel/task";

function getActivityAndInstanceId(activity) {
  const activityId = activity.id;
  let instanceId = null;
  if (activity.type === 'TASK' && activity.task?.instance?.id) {
    instanceId = activity.task?.instance?.id;
  }
  return { activityId, instanceId };
}

export function compareInstances(a, b) {
  const { activityId: activityIdA, instanceId: instanceIdA } = getActivityAndInstanceId(a);
  const { activityId: activityIdB, instanceId: instanceIdB } = getActivityAndInstanceId(b);

  if (activityIdA === activityIdB && instanceIdA === instanceIdB) {
    return true;
  }
  return false;
}


export function cleanToDependency(activity) {
  const newDependency = {
    id: activity.id,
    title: activity.title,
    // description: activity.description,
    type: activity.type,
    // status: activity.status,
    importance: activity.importance,
    difficulty: activity.difficulty,
    createdAt: activity.createdAt,
    keywords: activity.keywords,
  };

  if (activity.type === 'TASK') {
    newDependency.task = {
      id: activity.task.id,
      instance: {
        id: activity.task.instance.id ?? null,
        finalDate: activity.task.instance.finalDate ?? null,
        completedOn: activity.task.instance.completedOn ?? null,
        stepCompletionStatus: activity.task.instance.stepCompletionStatus ?? [],
      }
    };
  }

  return newDependency;
};


export function generateInstance(activity) {
  if (activity.type === "TASK") {
    const priority = calcPriority(activity);

    return {
      ...activity,
      priority,
      task: {
        ...activity.task,
        instance: {
          ...activity.task.instance,
          status: STATUS[0], // ACTIVE
          condiction: updateTaskCondiction(activity),
        }
      }
    }
  }
}