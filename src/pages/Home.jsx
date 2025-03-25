import classes from './Home.module.css';
import heroImg from '../assets/heroImg.webp';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div className={`${classes.hero} container`}>
        <div>
          <h1>Transforme sua rotina em uma história de conquistas!</h1>
          <p>Com o TaskStory, cada tarefa concluída é um passo rumo ao seu sucesso. Supere a procrastinação, organize seu dia e evolua de forma divertida com mecânicas de gamificação.</p>
          <div>
            <Link to="signup">
              <button>Comece Agora!</button>
            </Link>
          </div>
        </div>
        <img src={heroImg} />
      </div>
    </>
  )
};

export default HomePage;