import { Form, Link, useActionData, useNavigation } from "react-router-dom";


import styles from './CreateAccountForm.module.css';


function CreateAccountForm() {
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
      <div className={styles.formContainer}>
        <h1>Você já possui uma conta?</h1>
        <Link to="/login">Entre</Link>
      </div>
      <Form method="POST">
        <input id="name" name="name" type="text" className={styles.input} placeholder="Nome" required />
        <input id="email" name="email" type="email" placeholder="Email" required />
        <p>
          <label htmlFor="birthdate">Data de aniversário</label>
          <input type="date" id="birthdate" name="birthdate" />
        </p>
        <input id="password" name="password" type="password" className={styles.input} placeholder="Sua senha" required />
        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required />
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </Form>
    </>
  )
};

export default CreateAccountForm;