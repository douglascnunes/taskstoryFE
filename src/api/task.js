import { getAuthToken } from "../util/auth";
import { url } from '../util/api-helpers/url.js';



export async function getTask({ signal, id, instanceId }) {
  const token = getAuthToken();

  const instanceIdParams = instanceId ? ('/' + instanceId) : '';

  const response = await fetch(url + 'tasks/' + id + instanceIdParams, {
    signal,
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  const { task } = await response.json();

  return task;
};



export async function createTask({ signal, activity }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks', {
    signal,
    method: 'POST',
    body: JSON.stringify(activity),
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



export async function updateTask({ signal, activity }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + activity.id, {
    signal,
    method: 'PATCH',
    body: JSON.stringify(activity),
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


export async function upsertSteps({ signal, id, steps }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + id + '/steps', {
    signal,
    method: 'POST',
    body: JSON.stringify(steps),
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



export async function createInstance({ signal, taskId, taskInstance }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + taskId + '/instance', {
    signal,
    method: 'POST',
    body: JSON.stringify(taskInstance),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create task instance");
  };

  return await response.json();
};



export async function updateTaskInstance({ signal, activityId, instanceId, instance }) {
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + activityId + '/instance/' + instanceId, {
    signal,
    method: 'PATCH',
    body: JSON.stringify(instance),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to update task instance");
  };

  return await response.json();
};