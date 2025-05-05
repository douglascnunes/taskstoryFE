export function cleanTask(task) {
  const cleanedTask = {};
  for (const [key, value] of Object.entries(task)) {
    const hasLength = typeof value === 'string' || Array.isArray(value);
    if (
      value !== null &&
      value !== undefined &&
      (hasLength ? value.length > 0 : true)
    ) {
      cleanedTask[key] = value;
    }
  }
  return cleanedTask;
};

export function isTaskTimingValid(task) {
  const hasSomeTiming = task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays;
  const isNotMixingFrequencies = (!!task.frequenceIntervalDays === !!task.frequenceWeeklyDays);
  return hasSomeTiming && isNotMixingFrequencies;
};
