export function getAuthToken() {
  const token = localStorage.getItem('token');
  console.log(token)
  if(!token) {
    return null;
  };

  return token;
}