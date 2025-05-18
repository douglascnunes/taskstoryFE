export function preProcessActivity(keywords) {
  const createdAt = new Date();
  const keywordsId = keywords.map(k => k.id);
  return [createdAt, keywordsId];
};


export function cleanObject(object) {
  const cleanedObject = {};
  for (const [key, value] of Object.entries(object)) {
    const hasLength = typeof value === 'string' || Array.isArray(value);
    if (
      value !== null &&
      value !== undefined &&
      (hasLength ? value.length > 0 : true)
    ) {
      cleanedObject[key] = value;
    };
  };
  return cleanedObject;
};