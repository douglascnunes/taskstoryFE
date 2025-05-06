export function preProcessActivity(keywords) {
  const createdAt = new Date();
  const keywordsId = keywords.map(k => k.id);
  return [createdAt, keywordsId];
};