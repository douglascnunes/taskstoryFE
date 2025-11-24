export function preProcessActivity(keywords) {
  const createdAt = new Date();
  const keywordsId = keywords.map(k => k.id);
  return [createdAt, keywordsId];
};


export function cleanObject(object) {
  const cleanedObject = {};
  for (const [key, value] of Object.entries(object)) {
    if (value !== null && value !== undefined) {
      cleanedObject[key] = value;
    }
  }
  return cleanedObject;
};


export function preProcessDependency(instanceId, dependencies) {
  return dependencies.map(dep => {
    let depInstanceId = null;
    if (dep.activity.type === "TASK") {
      depInstanceId = dep.activity.task.instance.id ?? null;
    }
    return [
      dep.activity.id,
      depInstanceId,
      instanceId,
      dep.type,
      dep.description
    ]
  });
};