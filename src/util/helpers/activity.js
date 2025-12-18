import { STATUS } from "../enum";
import { calcPriority } from "../panel/activity";
import { updateTaskCondiction } from "../panel/task";

function getActivityAndInstanceId(activity) {
  const activityId = activity.id;
  let instanceId = null;
  if (String(activity.type).toUpperCase === "TASK" && activity.task?.instance?.id) {
    instanceId = activity.task?.instance?.id;
  }
  return { activityId, instanceId };
}

export function compareInstances(a, b) {

  const { activityId: activityIdA, instanceId: instanceIdA } = getActivityAndInstanceId(a);
  const { activityId: activityIdB, instanceId: instanceIdB } = getActivityAndInstanceId(b);

  return activityIdA === activityIdB && instanceIdA === instanceIdB;
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
  let activityCopy = null;
  console.log('Generating instance for activity:', activity); // Debug log

  if (activity.type === "TASK") {
    const priority = calcPriority(activity);

    activityCopy = {
      ...activity,
      priority,
      task: {
        ...activity.task,
        instance: {
          ...activity.task.instance[0],
          status: STATUS[0], // ACTIVE
        }
      }
    }
    activityCopy.task.instance.condiction = updateTaskCondiction(activityCopy);
  }


  return activityCopy;
}