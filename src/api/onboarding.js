export async function fetchQuestions() {
  const response = await fetch('http://localhost:3000/api/onboarding-questions');
  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json;
}