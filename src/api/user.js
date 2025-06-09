import { getAuthToken } from "../util/auth";
import { url } from '../util/api-helpers/url.js';



export async function getUser({ signal }) {
  const token = getAuthToken();

  const response = await fetch(url + 'user', {
    signal,
    headers: { 'Authorization': 'Bearer ' + token }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  const { user } = await response.json();

  return user;
};