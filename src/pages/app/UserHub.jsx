import { useContext, useEffect, useState } from 'react';
import styles from './UserHub.module.css';
import { AppContext } from '../../store/app-context';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/user';
import PerfilContent from './UserHubContent/PerfilContent';
import { Form } from 'react-router-dom';

const VIEW = {
  perfil: {
    TITLE: 'Perfil',
  },
  conta: {
    TITLE: 'Conta de Usuário',
  },
}

export default function UserHubPage() {
  const { user, loadUser } = useContext(AppContext);
  const [selectedView, setSelectedView] = useState('perfil');

  const { data: fetchedUser } = useQuery({
    queryKey: ['user'],
    queryFn: ({ signal }) => getUser({ signal }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (fetchedUser) {
      loadUser(fetchedUser);
    }
  }, [fetchedUser]);



  let content;


  if (user && selectedView === 'perfil') {
    content = <PerfilContent />;
  }

  else if (user && selectedView === 'conta') {
    content = <div>Conteúdo das Conta</div>;
  }

  else if (!user) {
    content = <p>Carregando...</p>;
  };


  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button onClick={() => setSelectedView('perfil')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
          </svg>
          Perfil
        </button>
        <button onClick={() => setSelectedView('conta')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Conta de Usuário
        </button>
        <hr />
        <Form action="/logout" method="POST">
          <button className={styles.logout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            Sair
          </button>
        </Form>
      </div>

      <div className={styles.content}>
        <h2 className={styles.viewTitle}>{VIEW[selectedView].TITLE}</h2>
        <hr></hr>
        {content}
      </div>
    </div>
  )
};