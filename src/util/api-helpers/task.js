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


export function cleanTaskInstance(task) {
  const cleanedInstance = {};
  for (const [key, value] of Object.entries(task)) {
    const hasLength = typeof value === 'string' || Array.isArray(value);
    if (
      value !== null &&
      value !== undefined &&
      (hasLength ? value.length > 0 : true)
    ) {
      cleanedInstance[key] = value;
    };
  };
  return cleanedInstance;
};


export function isTaskTimingValid(task) {
  const hasSomeTiming = task.endPeriod || task.frequenceIntervalDays || (task.frequenceWeeklyDays && task.frequenceWeeklyDays.length > 0);
  const isNotMixingFrequencies = (task.frequenceIntervalDays == true && (task.frequenceWeeklyDays && task.frequenceWeeklyDays.length > 0));
  return hasSomeTiming && !isNotMixingFrequencies;
};


export function preProcessTask(task, keywords) {
  const createdAt = new Date();
  const keywordsId = keywords ? keywords.map(k => k.id) : null;

  if (!task.id) {
    delete task.id;
    delete task.instance;
  }

  if (task.startPeriod) new Date(task.startPeriod)
  else delete task.startPeriod;

  if (task.endPeriod) new Date(task.endPeriod)
  else delete task.endPeriod;

  if (!task.frequenceIntervalDays) delete task.frequenceIntervalDays;

  if (!task.steps) delete task.steps;

  if (!task.frequenceWeeklyDays || task.frequenceWeeklyDays.length < 1) delete task.frequenceWeeklyDays;
  return [createdAt, keywordsId];
};