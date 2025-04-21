import { getAuthToken } from "../util/auth";


export async function upsertTask({ signal, task }) {
  let method;

  if (!task.id) {
    method = 'POST';
  } else {
    method = 'PATCH';
  };

  const token = getAuthToken();
  const response = await fetch('http://localhost:3000/api/tasks', {
    signal,
    method: method,
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
