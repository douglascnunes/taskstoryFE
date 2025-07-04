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