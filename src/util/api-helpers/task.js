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
    };
  };
  return cleanedTask;
};

export function isTaskTimingValid(task) {
  const hasSomeTiming = task.endPeriod || task.frequenceIntervalDays || task.frequenceWeeklyDays;
  const isNotMixingFrequencies = (task.frequenceIntervalDays == true && task.frequenceWeeklyDays == true);
  return hasSomeTiming && !isNotMixingFrequencies;
};


export function preProcessTask(task, keywords) {
  task.startPeriod = task.startPeriod ? new Date(task.startPeriod) : null;
  task.endPeriod = task.endPeriod ? new Date(task.endPeriod) : null;
  const createdAt = new Date();
  const cleanedTask = cleanTask(task);
  const keywordsId = keywords.map(k => k.id);
  return [createdAt, cleanedTask, keywordsId];
};