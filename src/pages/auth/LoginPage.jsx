import { redirect } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { authenticateStorage, checkProcrastinationType } from "../../util/auth";


export default function LoginPage() {
  return (
    <div className="container">
      <LoginForm />
    </div>
  )
};


export async function action({ request }) {
  const data = await request.formData();
  const loginData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  };

  if (!response.ok) {
    throw new Response(JSON.stringify(
      { message: 'Não foi possível realizar login.' },
      { status: 500 }
    ))
  }

  const resData = await response.json();
  authenticateStorage(resData);
  checkProcrastinationType();

  return redirect('/app')
};