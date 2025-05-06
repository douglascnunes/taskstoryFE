import { getAuthToken } from "../util/auth";
import { url } from '../util/api-helpers/url.js';


export async function createTask({ signal, task }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks', {
    signal,
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  };

  return await response.json();
};



export async function updateTask({ signal, task }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks', {
    signal,
    method: 'PATCH',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  };

  return await response.json();
};