import { cleanToDependency, compareInstances } from "../../util/helpers/activity";


export function computeNextDependencies(state, payload) {
  const currentDependencies = state.dependencies || [];

  if (payload.type !== "ACTIVITY") {
    return currentDependencies;
  }

  const cleanActivity = cleanToDependency(payload.activity);

  if (!cleanActivity) {
    return currentDependencies;
  }

  if (compareInstances(cleanActivity, state)) {
    return currentDependencies;
  }

  if (cleanActivity.type === "TASK") {
    const hasActivityDependency = currentDependencies.some(
      d => d.activity?.task?.instance?.id === cleanActivity.task.instance.id
    );

    if (hasActivityDependency) {
      return currentDependencies.filter(
        d => d.activity?.task?.instance?.id !== cleanActivity.task.instance.id
      );
    }

    return [
      ...currentDependencies,
      {
        type: payload.type || 'ACTIVITY',
        activity: cleanActivity,
        description: payload.description || null,
      }
    ];
  }

  return currentDependencies;
}
