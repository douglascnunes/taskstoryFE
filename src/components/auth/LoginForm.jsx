import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom";


import styles from './LoginForm.module.css';


export default function LoginForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="container">
      {data && data.data && (
        <ul>
          {Object.values(data.data).map(
            (err => <li key={err.path}>{err.msg}</li>)
          )}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <div className={styles.formContainer}>
        <h1>Entre na sua conta TaskStory</h1>
      </div>
      <Form method="POST">
        <input id="email" name="email" type="email" className={styles.input} placeholder="Email" required />
        <input id="password" name="password" type="password" className={styles.input} placeholder="Sua senha" required />
        <button className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Carregando' : 'Entrar'}
        </button>
      </Form>
    </div>
  )
};