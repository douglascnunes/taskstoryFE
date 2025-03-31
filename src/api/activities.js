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

  const { activities } = await response.json();

  return activities;
};
