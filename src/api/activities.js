import { getAuthToken } from "../util/auth";


export async function getOverview({ signal }) {
  const token = getAuthToken();

  const response = await fetch('http://localhost:3000/api/overview', {
    signal,
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch overview activities");
  }

  const { activities, startdate, finaldate } = await response.json();

  return { activities, startdate, finaldate };
};


export async function upsertActivity({ signal, activity }) {
  let method;

  if (!activity.id) {
    method = 'POST';
  } else {
    method = 'PATCH';
  };

  const token = getAuthToken();
  const response = await fetch('http://localhost:3000/api/activities', {
    signal,
    method: method,
    body: JSON.stringify(activity),
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
