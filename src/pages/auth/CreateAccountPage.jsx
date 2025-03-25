import { redirect } from "react-router-dom";


import CreateAccountForm from "../../components/auth/CreateAccountForm";


export default function CreateAccountPage() {

  return (
    <div className="container">
      <CreateAccountForm />
    </div>
  )
};


export async function action({ request }) {
  const data = await request.formData();
  const accountData = {
    name: data.get('name'),
    email: data.get('email'),
    birthdate: data.get('birthdate'),
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword')
  }
  console.log('ANIVERSARIO:' + accountData.birthdate)

  const response = await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accountData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  };

  if (!response.ok) {
    throw new Response(JSON.stringify(
      { message: 'Não foi possivel criar a conta.' },
      { status: 500 }
    ))
  }

  const resData = await response.json()
  const token = resData.token;
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  const procrastinationType = resData.procrastinationType;
  localStorage.setItem('procrastinationType', procrastinationType);

  return redirect('/onboarding')
};