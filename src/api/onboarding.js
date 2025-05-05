import { getAuthToken } from "../util/auth";

export async function fetchQuestions({ signal }) {
  const response = await fetch('http://localhost:3000/api/onboarding-questions', { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const { questions } = await response.json();

  return questions.default;
};

export async function fetchAreasOfLife({ signal }) {
  const response = await fetch('http://localhost:3000/api/areasoflife', { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const { areasOfLife } = await response.json();

  return areasOfLife;
};

export async function onboarding({ accountType, desirable, mostPracticed }) {
  const token = getAuthToken();
  const response = await fetch('http://localhost:3000/api/onboarding', {
    method: 'PATCH',
    body: JSON.stringify({ accountType, desirable, mostPracticed }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    const error = new Error("Failed to patch onboarding");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  };
  
  return response.json();
};

