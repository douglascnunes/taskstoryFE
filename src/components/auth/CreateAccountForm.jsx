import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useState } from "react";
import { AVATAR } from '../../util/enum';

import styles from './CreateAccountForm.module.css';

function CreateAccountForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [selectedAvatarFilename, setSelectedAvatarFilename] = useState('default.png');

  const avatarOptions = Object.entries(AVATAR);

  return (
    <>
      {data?.data && (
        <ul>
          {Object.values(data.data).map(err => (
            <li key={err.msg}>{err.msg}</li>
          ))}
        </ul>
      )}
      {data?.message && <p>{data.message}</p>}

      <div className={styles.formContainer}>
        <h1>Você já possui uma conta?</h1>
        <Link to="/login">Entre</Link>
      </div>

      <Form method="POST">
        <div className={styles.formContainer}>
          <div className={styles.avatarContainer}>
            <h2 className={styles.avatarLabel}>Escolha seu avatar</h2>
            <div>
              {avatarOptions.map(([key, [filename]]) => {
                const url = `/images/avatar/size_300/${filename}`;
                return (
                  <img
                    key={key}
                    src={url}
                    alt={key}
                    onClick={() => setSelectedAvatarFilename(filename)}
                    className={`${styles.avatar} ${selectedAvatarFilename === filename ? styles.selected : ''}`}
                  />
                );
              })}
              <input type="hidden" id="avatar" name="avatar" value={selectedAvatarFilename} />
            </div>
          </div>

          <div>
            <input className={styles.input} id="name" name="name" type="text" placeholder="Nome" required />
            <input className={styles.input} id="email" name="email" type="email" placeholder="Email" required />
            <p>
              <label htmlFor="birthdate">Data de aniversário</label>
              <input className={styles.input} type="date" id="birthdate" name="birthdate" />
            </p>
            <input className={styles.input} id="password" name="password" type="password" placeholder="Sua senha" required />
            <input className={styles.input} id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required />
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Criar Conta'}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default CreateAccountForm;
