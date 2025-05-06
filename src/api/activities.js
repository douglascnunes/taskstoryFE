import { getAuthToken } from "../util/auth";
import { url } from '../util/api-helpers/url.js';



export async function getOverview({ signal, startdateFilter, finaldateFilter }) {
  const token = getAuthToken();

  const params = new URLSearchParams();
  if (startdateFilter) params.append('startdate', startdateFilter);
  if (finaldateFilter) params.append('finaldate', finaldateFilter);

  const response = await fetch(`${url}overview?${params.toString()}`, {
    signal,
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch overview activities");
  }

  const { activities, startdate, finaldate } = await response.json();

  return { activities, startdate, finaldate };
};



export async function createActivity({ signal, activity }) {
  const token = getAuthToken();

  const response = await fetch(url + 'activities', {
    signal,
    method: 'POST',
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


export async function updateActivity({ signal, activity }) {

  const token = getAuthToken();
  const response = await fetch(url + 'activities', {
    signal,
    method: 'PATCH',
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
