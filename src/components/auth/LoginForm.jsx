import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom";


import classes from './CreateAccountForm.module.css';


export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      {data && data.data && (
        <ul>
          {Object.values(data.data).map(
            (err => <li key={err.path}>{err.msg}</li>)
          )}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <div className={classes.formContainer}>
        <h1>Você já possui uma conta?</h1>
        <Link to="login">Entre</Link>
      </div>
      <Form method="POST">
        <input id="email" name="email" type="email" placeholder="Email" required />
        <input id="password" name="password" type="password" placeholder="Sua senha" required />
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Carregando' : 'Entrar'}
        </button>
      </Form>
    </>
  )
};