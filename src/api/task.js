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
  console.log('createTask');
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
  console.log('updateTask');
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
  console.log('upsertSteps');
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



export async function createTaskInstance({ signal, taskId, instance }) {
  console.log('createTaskInstance');
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + taskId + '/instance', {
    signal,
    method: 'POST',
    body: JSON.stringify(instance),
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



export async function updateTaskInstance({ signal, taskId, instanceId, instance }) {
  console.log('updateTaskInstance');
  const token = getAuthToken();

  const response = await fetch(url + 'tasks/' + taskId + '/instance/' + instanceId, {
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