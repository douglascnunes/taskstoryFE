import { getAuthToken } from '../util/auth';

export async function getUserKeywords({ signal }) {

  const token = getAuthToken();
  const response = await fetch('http://localhost:3000/api/userkeywords', {
    signal,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  if (!response.ok) {
    const error = new Error("Failed to fetch keywords");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  };

  const { keywords } = await response.json();

  return keywords;
};


export async function createKeyword({ signal, keyword }) {
  const token = getAuthToken();
  const response = await fetch('http://localhost:3000/api/keywords', {
    signal,
    method: 'POST',
    body: JSON.stringify(keyword),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create activity");
  };

  return await response.json();
};
