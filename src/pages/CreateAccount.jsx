import { useState } from "react";


import CreateAccountForm from "../components/CreateAccountForm";


function CreateAccountPage() {
  const [statusProgress, setStatusProgress] = useState(0);

  return (
    <div className="container">
      <CreateAccountForm />
    </div>
  )
}

export default CreateAccountPage;



export async function action({ request }) {
  const data = await request.formData();
  const accountData = {
    name: data.get('name'),
    email: data.get('email'),
    birthdate: data.get('birthdate'),
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword')
  }
  console.log('ANIVERSARIO:'+accountData.birthdate)

  const response = await fetch('http://localhost:8080/api/signup', {
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
    localStorage.setItem('expiration', expiration.toISOString);

    return redirect('/')
};