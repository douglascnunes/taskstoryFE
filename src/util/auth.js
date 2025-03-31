import { redirect } from "react-router-dom";
import { PROCRASTINATION_TYPE } from "./enum";


export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime()
  return duration;
}


export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  };

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};


export function tokenLoader() {
  const token = getAuthToken();
  return token;
};


export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    throw redirect('/login');
  }

  return null
};

export function checkProcrastinationType() {
  const procrastinationType = localStorage.getItem('procrastinationType');

  if (!procrastinationType ||
    procrastinationType === PROCRASTINATION_TYPE[0] ||
    !PROCRASTINATION_TYPE.includes(procrastinationType)
  ) {
    throw redirect('/onboarding');
  };
};

export function authenticateStorage({ token, procrastinationType }) {
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('procrastinationType', procrastinationType);
};