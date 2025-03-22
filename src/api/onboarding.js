export async function fetchQuestions({ signal }) {
  const response = await fetch('http://localhost:3000/api/onboarding-questions', { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  const { questions } = await response.json();
  
  return questions.default;
}